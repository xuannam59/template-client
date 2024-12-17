export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
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
            aipPath: string;
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
