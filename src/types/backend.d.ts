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
            reviewScore?: number
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

export interface IGetAccount {
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

export interface ICategories {
    _id: string
    title: string
    parentId?: string
    status: string
    image: string
    slug: string
    displayMode: boolean

    children?: ICategories[]
    isDeleted?: boolean
    createdAt?: string
    updatedAt?: string
}

export interface IProducts {
    _id: string
    title: string
    description: string
    categoryId: {
        _id: string
        title: string
    }
    price: number
    discountPercentage: number
    images: string[]
    thumbnail: string
    status: string
    versions: {
        color: string
        quantity: number
    }[]
    reviews: {
        score: number
        numberOf: number
    }
    slug: string
    sales: number
    ram?: string
    chip?: string
    ssd?: string
    gpu?: string

    isDeleted?: boolean
    createdAt?: string
    updatedAt?: string
}

export interface ICart {
    _id: string
    userId?: string
    productList: IProducts
    userAddress: IUserAddress
}

export interface IDiscountCode {
    _id: string
    title: string
    code: string
    value: number
    quantityAvailable: number
    maxValue: number
    minValue: number
    type: string
    startAt: string
    endAt: string
    slug: string
}

export interface ISelectModel {
    label: string,
    value: string
}

export interface IUserAddress {
    _id: string
    name: string
    phoneNumber: string
    homeNo: string
    province: string
    district: string
    ward: string
    isDefault: boolean

    createdAt?: string
    updatedAt?: string
}

export interface IReview {
    _id: string
    comment: string
    like: string[]
    product_id: string
    parent_id: string
    star: number
    images: string[]
    created_by: {
        _id: string
        name: string
        avatar: string
    }
    isDeleted: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface IDiscuss extends Omit<IReview, "images" | "like" | "star" | "product_id"> { }