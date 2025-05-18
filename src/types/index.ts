import { ElementHandle } from "puppeteer";

type Product = {
    title: string;
    description: string;
    imageSrc: string;
};

type Category = {
    title: string;
    handle: ElementHandle<any>;
    products: Product[];
};

type PageData = {
    categories: Category[];
};

export { Product, Category, PageData };
