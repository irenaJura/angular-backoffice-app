export interface Product {
    data: {
        id: number;
        title: string;
        description: string;
        price: number;
        category: string;
        employee: string;
        reviews: Array<string>;
    }
}