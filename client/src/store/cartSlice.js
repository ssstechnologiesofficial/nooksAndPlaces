import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SummaryApi from '../common/SummaryApi';

// Async thunk to fetch total cart quantity
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const res = await fetch(SummaryApi.countAddedProduct.url, {
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch cart');
  return data.count; // <-- correct key
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.totalQuantity = action.payload;
    });
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
