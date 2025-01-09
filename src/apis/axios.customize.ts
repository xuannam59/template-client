import { IBackendRes } from "@/types/backend";
import { Mutex } from "async-mutex";
import axios from "axios";

interface AccessTokenResponse {
    access_token: string;
}

const baseURL = import.meta.env.VITE_BACKEND_URL as string;
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

const mutex = new Mutex();
const NO_RETRY_HEADER = 'x-no-retry'


const handleRefreshToken = async (): Promise<string | null> => {
    return await mutex.runExclusive(async () => {
        const res = await instance.post<IBackendRes<AccessTokenResponse>>('/api/v1/auth/refresh-token');
        if (res && res.data) return res.data.access_token;
        else return null;
    })
}

// Add a request interceptor
instance.interceptors.request.use((config) => {
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(
    (res) => res.data
    , async (error) => {
        if (
            error.config && error.response
            && +error.response.status === 401
            && error.config.url !== '/api/v1/auth/login'
            && !error.config.headers[NO_RETRY_HEADER] // không có biến này ở header thì mới retry
        ) {
            const access_token = await handleRefreshToken();
            error.config.headers[NO_RETRY_HEADER] = 'true'; // retry chỉ được 1 lần
            if (access_token) {
                error.config.headers["Authorization"] = `Bearer ${access_token}`;
                localStorage.setItem("access_token", access_token);
                return instance.request(error.config);
            }
        }

        // xử lý refresh_token hết hạn
        if (
            error.config && error.response
            && +error.response.status === 400
            && error.config.url === "/api/v1/auth/refresh-token"
            && location.pathname.startsWith("/user") // chỉ có trang cá nhân mới chuyền về login
        ) {
            await instance.post<IBackendRes<string>>("api/v1/auth/logout");
            window.location.href = "/login"
        }
        return error?.response?.data ?? Promise.reject(error);
    });

export default instance;