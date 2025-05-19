type Product = {
    title: string;
    description: string;
    imageSrc: string;
};

type ProductsCategory = {
    title: string;
    products: Product[];
};

type PageData = {
    productsByCategory: ProductsCategory[];
};

export { Product, ProductsCategory, PageData };
