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
      state._id = action?.payload?._id;
      state.productList = action?.payload?.productList ?? [];
      state.userAddress = action?.payload?.userAddress;
    },
    doAddAddress: (state, action) => {
      const { _id, email, name, phoneNumber, homeNo, province, district, ward, isDefault } = action.payload;
      if (isDefault) {
        state.userAddress.forEach(item => {
          item.isDefault = false;
        });
      }
      state.userAddress.push({ _id, email, name, phoneNumber, homeNo, province, district, ward, isDefault });
    },
    doUpdateAddress: (state, action) => {
      const { _id, name, phoneNumber, homeNo, province, district, ward, isDefault } = action.payload;
      state.userAddress.forEach(item => {
        if (item._id === _id) {
          item.name = name;
          item.phoneNumber = phoneNumber;
          item.homeNo = homeNo;
          item.province = province;
          item.district = district;
          item.ward = ward;
          item.isDefault = isDefault;
        };
        if (isDefault && item._id !== _id) {
          item.isDefault = false;
        }
      });
    },
    doRemoveAddress: (state, action) => {
      const _id = action.payload;
      for (const item of state.userAddress) {
        if (item._id !== _id) {
          item.isDefault = true;
          break;
        }
      }
      state.userAddress = state.userAddress.filter(item => item._id !== _id);
    },
    doAddProduct: (state, action) => {
      const { productDetail, quantity, maxQuantity, color } = action.payload

      const existProduct = state.productList.findIndex(item => {
        const exist = item.productId._id === productDetail._id && item.color === color
        return exist;
      });
      console.log(existProduct);
      if (existProduct === -1) {
        state.productList.unshift({ productId: productDetail, quantity, color, _id: productDetail._id });
        return;
      }
      const newProductList = state.productList.map(item => {
        if (item.productId._id === productDetail._id) {
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
  doAddProduct, doRemoveProduct, doChangeQuantityOrColor, doUpdateAddress
} = cartSlide.actions;

