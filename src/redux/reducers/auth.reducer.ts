import { createSlice } from "@reduxjs/toolkit";

export interface authSate {
  isAuthenticated: boolean,
  isLoading: boolean
  user: {
    _id: string;
    avatar: string;
    email: string;
    name: string;
    phone: string;
    age: string;
    gender: string;
    address: string;
    role: {
      _id: string,
      name: string
    };
    permissions: {
      _id: string,
      name: string,
      method: string,
      apiPath: string,
      module: string
    }[]
  }
}

const initialState: authSate = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    _id: "",
    email: "",
    name: "",
    phone: "",
    gender: "",
    age: "",
    address: "",
    role: {
      _id: "",
      name: ""
    },
    avatar: "",
    permissions: []
  }
}


const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user._id = action?.payload?._id;
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.phone = action.payload.phone;
      state.user.age = action.payload.age;
      state.user.gender = action.payload.gender;
      state.user.address = action.payload.address;
      state.user.role = action?.payload?.role;
      state.user.avatar = action?.payload?.avatar;
      state.user.permissions = action?.payload?.permissions;
    },
    doGetAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user._id = action?.payload?._id;
      state.user.email = action.payload.email;
      state.user.phone = action.payload.phone;
      state.user.age = action.payload.age;
      state.user.gender = action.payload.gender;
      state.user.address = action.payload.address;
      state.user.name = action.payload.name;
      state.user.role = action?.payload?.role;
      state.user.avatar = action?.payload?.avatar;
      state.user.permissions = action?.payload?.permissions;
    },
    doLogOutAction: (state) => {
      window.localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = {
        _id: "",
        email: "",
        name: "",
        phone: "",
        gender: "",
        age: "",
        address: "",
        role: {
          _id: "",
          name: ""
        },
        avatar: "",
        permissions: []
      };
    }
  }
});

export const authReducer = authSlide.reducer
export const { doLoginAction, doGetAccountAction, doLogOutAction } = authSlide.actions;

