import { IProducts } from "@/types/backend";
import { createSlice } from "@reduxjs/toolkit";

export interface cartSate {
  _id: string;
  productList: {
    _id: string
    productId: IProducts,
    color: string,
    quantity: number
  }[]
}

const initialState: cartSate = {
  _id: "",
  productList: []
}


const cartSlide = createSlice({
  name: "cart",
  initialState,
  reducers: {
    doGetCart: (state, action) => {
      state._id = action?.payload?._id
      state.productList = action?.payload?.productList
    },
  }
});

export const cartReducer = cartSlide.reducer
export const { doGetCart } = cartSlide.actions;

