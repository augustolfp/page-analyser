import puppeteer, { ElementHandle } from "puppeteer";

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

export async function scrapePageData(url: string): Promise<PageData> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const handles = await page.$$(".pd-prd-group, pd-prd-group-loop");

    const categories = await Promise.all(
        handles.map((handle) => getCategory(handle)),
    );

    await browser.close();

    return {
        categories,
    };
}

async function getCategory(
    categoryHandle: ElementHandle<any>,
): Promise<Category> {
    const title: string = await categoryHandle.$eval(
        ".pd-prd-group-title span",
        (node) => node.innerText,
    );

    const products = await getCategoryProducts(categoryHandle);

    return {
        title: title,
        handle: categoryHandle,
        products: products,
    };
}

async function getCategoryProducts(
    categoryHandle: ElementHandle<any>,
): Promise<Product[]> {
    const handles = await categoryHandle.$$(".pd-prd");

    const products = await Promise.all(
        handles.map((handle) => getProduct(handle)),
    );

    return products;
}

async function getProduct(productHandle: ElementHandle<any>): Promise<Product> {
    const title: string = await productHandle.$eval(
        ".pd-prd-info-title",
        (node) => node.innerText,
    );

    const description: string = await productHandle.$eval(
        ".pd-prd-info-desc",
        (node) => node.innerText,
    );

    const imageSrc: string = await productHandle.$eval("img", (node) =>
        node.getAttribute("data-src"),
    );

    return {
        title,
        description,
        imageSrc,
    };
}
