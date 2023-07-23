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
    category: string;
    color: string;
    description: string;
    image: string;
    name: string;
    price: string;
}