import { IAccount, IBackendRes } from "@/types/backend";
import axios from "./axios.customize";

export const callLogin = (email: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>("/auth/login", { email, password });
}

// export const callRegister = (email: string, password: string) => {
//     return axios.post<IBackendRes<IAccount>>("/auth/login", { email, password });
// }

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

