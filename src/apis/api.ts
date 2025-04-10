import { IAccount, IBackendRes, IBackendResWithPagination, ICart, ICategories, IDiscountCode, IDiscuss, IForgotPassword, IGetAccount, IOrder, IPayOS, IPayOSPost, IProducts, IReview, IUserAddress } from "@/types/backend";
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

export const callUpdateUser = (data: any) => {
    return axios.patch<IBackendRes<string>>(`api/v1/users/${data._id}`, data);
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

export const callGetRelatedProduct = (productSlug: string = "") => {
    return axios.get<IBackendRes<IProducts[]>>(`api/v1/products/get-related/${productSlug}`);
}

export const callGetUserCart = (userId: string | undefined) => {
    return axios.post<IBackendRes<ICart>>(`api/v1/carts`, { userId });
}

export const callAddProductToCart = (productId: string, quantity: number, color: string) => {
    return axios.patch<IBackendRes<string>>(`api/v1/carts/add-product`, { productId, quantity, color });
}

export const callRemoveProductToCart = (id: string, color: string) => {
    return axios.patch<IBackendRes<string>>(`api/v1/carts/remove-product`, { id, color });
}

export const callChangeProductType = (_id: string, value: number | string, type: string) => {
    return axios.patch<IBackendRes<string>>(`api/v1/carts/change-product-type`, { _id, value, type });
}

export const callCheckDiscountCode = (code: string, totalAmount: number) => {
    return axios.get<IBackendRes<IDiscountCode>>(`api/v1/promotions/${code}`, { params: { totalAmount } });
}

export const callAddNewAddress = (data: IUserAddress) => {
    return axios.post<IBackendRes<IUserAddress>>('api/v1/carts/add-user-address', data)
}

export const callEditAddress = (id: string, data: IUserAddress) => {
    return axios.patch<IBackendRes<string>>(`api/v1/carts/edit-user-address/${id}`, data)
}

export const callDeleteAddress = (id: string) => {
    return axios.delete<IBackendRes<ICart>>(`api/v1/carts/delete-user-address/${id}`)
}

export const callGetReviews = (query: string = "") => {
    return axios.get<IBackendResWithPagination<IReview>>(`api/v1/reviews?${query}`);
}

export const callChangeLike = (reviewId: string) => {
    return axios.patch<IBackendRes<string>>(`api/v1/reviews/change-like/${reviewId}`);
}

export const callCreateDiscuss = (comment: string, parent_id: string) => {
    return axios.post<IBackendRes<{ _id: string }>>(`api/v1/discuss`, { comment, parent_id });
}

export const callGetDiscuss = (query: string = "") => {
    return axios.get<IBackendRes<IDiscuss[]>>(`api/v1/discuss?${query}`);
}

export const callDeleteDiscuss = (discussId: string) => {
    return axios.delete<IBackendRes<string>>(`api/v1/discuss/${discussId}`);
}

export const callCreateOrder = (data: unknown) => {
    return axios.post<IBackendRes<{ _id: string }>>(`api/v1/orders`, data);
}

export const callGetOrder = (current: number, pageSize: number, userId: string, status: number) => {
    const query = `current=${current}&pageSize=${pageSize}&userId=${userId}&status=${status}&sort=-createdAt`;
    return axios.get<IBackendResWithPagination<IOrder>>(`api/v1/orders?${query}`);
}

export const callUpdateOrder = (_id: string, orderId: string) => {
    return axios.patch<IBackendRes<string>>(`api/v1/orders/update/${_id}`, { orderId });
}

export const callCreateReview = (orderId: string, data: any) => {
    return axios.post<IBackendRes<string>>(`api/v1/reviews/${orderId}`, data);
}

export const callChangePassword = (oldPassword: string, newPassword: string, confirmPassword: string) => {
    return axios.patch<IBackendRes<string>>(`api/v1/auth/change-password`, {
        oldPassword, newPassword, confirmPassword
    });
}


export const callUploadSingleFile = (file: any, folderName: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    return axios<IBackendRes<{ fileUpload: string }>>({
        method: 'post',
        url: 'api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "folder-name": folderName
        }
    });
}

export const callPayOS = (data: IPayOSPost) => {
    return axios.post<IBackendRes<IPayOS>>("api/v1/pay-os/create", data);
}

