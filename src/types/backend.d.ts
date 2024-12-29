export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IBackendResWithPagination<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            totalItems: number;
        };
        result: T[]
    };
}

export interface IAccount {
    access_token: string;
    user: {
        _id: string;
        name: string;
        email: string;
        role: {
            _id: string;
            name: string;
        };
        permission: {
            _id: string;
            name: string;
            method: string;
            apiPath: string;
            module: string;
        }[]
    }
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    age?: number;
    gender?: string
    address?: string
    role?: {
        _id: string;
        name: string
    }

    createdBy?: string;
    createdAt?: string;
    isDeleted?: boolean;
    deletedAt?: string | null;
    updatedAt?: string;
}

export interface IForgotPassword {
    email: string
}

export interface IGetAccount extends Omit<IAccount, "access_token"> { }

export interface ICategories {
    _id: string
    title: string
    parentId: {
        _id: string
        title: string
    }
    status: string
    image: string
    slug: string

    isDeleted?: boolean
    createdAt?: string
    updatedAt?: string
}