import { IAccount, IBackendRes, IForgotPassword } from "@/types/backend";
import axios from "./axios.customize";

export const callLogin = (email: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>("/auth/login", { email, password });
}

export const callRegister = (name: string, email: string, password: string, confirmPassword: string, phone: string) => {
    return axios.post<IBackendRes<{ _id: string }>>("/auth/register", { name, email, password, confirmPassword, phone });
}

export const callForgotPassword = (email: string) => {
    return axios.post<IBackendRes<IForgotPassword>>("/auth/forgot-password", { email })
}

export const callVerifyCode = (email: string, otp: string) => {
    return axios.post<IBackendRes<IForgotPassword>>("/auth/confirm-code", { email, otp })
}

export const callResetPassword = (email: string, otp: string, password: string, confirmPassword: string) => {
    return axios.post<IBackendRes<any>>("/auth/reset-password", { email, otp, password, confirmPassword })
}

export const callUploadSingleFile = (file: any) => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    return axios<IBackendRes<{ fileUpload: string }>>({
        method: 'post',
        url: '/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

