import { IAccount, IBackendRes, IBackendResWithPagination, ICategories, IForgotPassword, IGetAccount } from "@/types/backend";
import axios from "./axios.customize";

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

export const callGetCategories = () => {
    return axios.get<IBackendResWithPagination<ICategories>>("api/v1/categories");
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

