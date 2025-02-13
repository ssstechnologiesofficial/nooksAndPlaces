
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for Admin Login
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/loginAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();  // Raw response
      console.log("🔍 Raw API Response:", text);  // Debugging

      if (!text) {
        throw new Error("❌ Empty response from server");
      }

      const data = JSON.parse(text);
      console.log("✅ Parsed Response:", data);  // Debugging

      if (!response.ok) {
        throw new Error(data.message || "❌ Login failed");
      }

      // Store in localStorage
      console.log("✅ Storing Token in LocalStorage:", data.token);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      return data;
    } catch (error) {
      console.error("⛔ Login error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for Subadmin Creation
export const createSubAdmin = createAsyncThunk(
  "auth/createSubAdmin",
  async ({ name, email, password, contactNo, role, permissions }, { rejectWithValue }) => {
    try {
      const adminToken = localStorage.getItem("adminToken"); // Use admin token
      if (!adminToken) {
        throw new Error("Admin token is missing. Please log in again.");
      }

      // Only include companyId for role 3 (admin)
      const bodyData = {
        name,
        email,
        password,
        contactNo,
        role,
        permissions,
      };

      const response = await fetch("http://localhost:5000/api/create-subadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,  // Ensure Bearer format
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Subadmin creation failed");
      }

      return data;
    } catch (error) {
      console.error("Subadmin creation failed:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  // admin: JSON.parse(localStorage.getItem("admin")) || null,
  adminToken: localStorage.getItem("adminToken") || null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.admin = null;
      state.adminToken = null;

      // Remove from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error("User login failed:", action.payload);
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.adminToken = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        console.error("Admin login failed:", action.payload);
      })
      // Handle Subadmin Creation
      .addCase(createSubAdmin.fulfilled, (state, action) => {
        console.log("Subadmin created successfully:", action.payload);
        // Optionally, you can update the state if needed, for example:
        // state.subadmins.push(action.payload.subadmin);
      })
      .addCase(createSubAdmin.rejected, (state, action) => {
        console.error("Subadmin creation failed:", action.payload);
      });
  },
});
export const { logout,loginSuccess} = userSlice.actions;
export default userSlice.reducer;
