import { IProducts, IUserAddress } from "@/types/backend";
import { createSlice } from "@reduxjs/toolkit";

export interface cartSate {
  _id: string;
  productList: {
    _id: string;
    productId: IProducts,
    color: string,
    quantity: number
  }[],
  userAddress: IUserAddress[]
}

const initialState: cartSate = {
  _id: "",
  productList: [],
  userAddress: []
}


const cartSlide = createSlice({
  name: "cart",
  initialState,
  reducers: {
    doGetCart: (state, action) => {
      state._id = action?.payload?._id
      state.productList = action?.payload?.productList
      state.userAddress = action?.payload?.userAddress
    },
    doAddAddress: (state, action) => {

    },
    doRemoveAddress: (state, action) => {

    },
    doAddProduct: (state, action) => {
      const { productId, quantity, maxQuantity, color } = action.payload
      action.payload._id = productId;
      const existProduct = state.productList.findIndex(item => {
        const exist = item.productId._id === productId && item.color === color
        return exist;
      });
      if (existProduct === -1) {
        state.productList.unshift(action.payload);
        return;
      }
      const newProductList = state.productList.map(item => {
        if (item.productId._id === productId) {
          item.quantity = Math.min(maxQuantity, item.quantity + quantity);
        }
        return item;
      });
      state.productList = newProductList;
    },
    doRemoveProduct: (state, action) => {
      const { color, productId } = action.payload;
      const newProductList = state.productList.filter(item => !(item.productId._id === productId
        && item.color === color));
      state.productList = newProductList
    },
    doChangeQuantityOrColor: (state, action) => {
      const { type, productId, value, maxQuantity } = action.payload;
      const newProductList = state.productList.map(item => {
        if (item.productId._id === productId) {
          item.quantity = type === "quantity" ? Math.min(maxQuantity, value) : item.quantity;
          item.color = type === "color" ? value : item.color;
        }
        return item;
      });
      state.productList = newProductList;

    },
    doOrderProduct: (state) => {
      state.productList = []
    }
  }
});

export const cartReducer = cartSlide.reducer
export const { doGetCart, doOrderProduct, doAddAddress, doRemoveAddress,
  doAddProduct, doRemoveProduct, doChangeQuantityOrColor
} = cartSlide.actions;

