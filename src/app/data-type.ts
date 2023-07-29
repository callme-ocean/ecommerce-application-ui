export interface SingUp {
    name: string;
    password: string;
    email: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface Product {
    id: number;
    category: string;
    color: string;
    description: string;
    image: string;
    name: string;
    price: string;
    quantity: undefined | number;
}

export interface Cart {
    id: undefined | number;
    category: string;
    color: string;
    description: string;
    image: string;
    name: string;
    price: string;
    quantity: undefined | number;
    userId: number;
    productId: number;
}