import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./userSlice"
import cartReducer from "./cartSlice"
import wishlistReducer from "./wishlistSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
