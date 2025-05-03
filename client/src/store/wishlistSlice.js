// store/wishlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SummaryApi from '../common/SummaryApi';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => {
  const response = await fetch(SummaryApi.getWishlist.url, {
    credentials: 'include',
  });
  const data = await response.json();
  return data.wishlist;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default wishlistSlice.reducer;
