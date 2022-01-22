export interface Product {
    data: {
        title: string;
        description: string;
        price: number;
        category: string;
        employee: string;
        reviews: Array<string>;
    },
    id: number;
}