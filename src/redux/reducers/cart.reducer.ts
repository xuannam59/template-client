import { IProducts } from "@/types/backend";
import { createSlice } from "@reduxjs/toolkit";

export interface cartSate {
  _id: string;
  productList: {
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
    doAddProduct: (state, action) => {
      const product = {
        productId: action?.payload?.productId,
        color: action?.payload?.color,
        quantity: action?.payload?.quantity
      }
    },
    doRemoveProduct: (state, action) => {
      const productId = action?.payload?._id
    }
  }
});

export const cartReducer = cartSlide.reducer
export const { doGetCart, doAddProduct } = cartSlide.actions;

