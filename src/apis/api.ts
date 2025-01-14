import { IAccount, IBackendRes, IBackendResWithPagination, ICart, ICategories, IForgotPassword, IGetAccount, IProducts } from "@/types/backend";
import axios from "./axios.customize";
import { data } from "react-router";

export const callLogin = (email: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>("api/v1/auth/login", { email, password });
}

export const callRegister = (name: string, email: string, password: string, confirmPassword: string, phone: string) => {
    return axios.post<IBackendRes<{ _id: string }>>("api/v1/auth/register", { name, email, password, confirmPassword, phone });
}

export const callForgotPassword = (email: string) => {
    return axios.post<IBackendRes<IForgotPassword>>("api/v1/auth/forgot-password", { email })
}

export const callVerifyCode = (email: string, otp: string) => {
    return axios.post<IBackendRes<IForgotPassword>>("api/v1/auth/confirm-code", { email, otp })
}

export const callResetPassword = (email: string, otp: string, password: string, confirmPassword: string) => {
    return axios.post<IBackendRes<any>>("api/v1/auth/reset-password", { email, otp, password, confirmPassword })
}

export const callGetAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>("api/v1/auth/account");
}

export const callLogOut = () => {
    return axios.post<IBackendRes<string>>("api/v1/auth/logout");
}

export const callGetCategories = (query: string = "") => {
    return axios.get<IBackendResWithPagination<ICategories>>(`api/v1/categories?${query}`);
}

export const callGetProducts = (query: string = "") => {
    return axios.get<IBackendResWithPagination<IProducts>>(`api/v1/products?${query}`);
}

export const callGetProductDetail = (idOrSlug: string = "") => {
    return axios.get<IBackendRes<IProducts>>(`api/v1/products/${idOrSlug}`);
}

export const callGetUserCart = (userId: string | undefined) => {
    return axios.post<IBackendRes<ICart>>(`api/v1/carts`, { userId });
}

export const callAddProductToCart = (productId: string, quantity: number, color: string) => {
    return axios.patch<IBackendRes<ICart>>(`api/v1/carts/add-product`, { productId, quantity, color });
}

export const callRemoveProductToCart = (id: string) => {
    return axios.patch<IBackendRes<ICart>>(`api/v1/carts/remove-product`, { id });
}

export const callChangeProductType = (_id: string, value: number | string, type: string) => {
    return axios.patch<IBackendRes<ICart>>(`api/v1/carts/change-quantity`, { _id, value, type });
}

export const callUploadSingleFile = (file: any) => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    return axios<IBackendRes<{ fileUpload: string }>>({
        method: 'post',
        url: 'api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

