import { ElementHandle, Page } from "puppeteer";
import type { Product, ProductsCategory } from "../../types/index.js";

export async function getAllProducts(page: Page): Promise<ProductsCategory[]> {
    const categoryHandles = await page.$$(".pd-prd-group, pd-prd-group-loop");

    const allProductsByCategory = await Promise.all(
        categoryHandles.map((categoryHandle) =>
            getProductsCategory(categoryHandle),
        ),
    );

    return allProductsByCategory;
}

async function getProductsCategory(
    categoryHandle: ElementHandle<any>,
): Promise<ProductsCategory> {
    const title: string = await categoryHandle.$eval(
        ".pd-prd-group-title span",
        (node) => node.innerText,
    );

    const products = await getAllProductsFromNode(categoryHandle);

    return {
        title,
        products,
    };
}

// Recebe um ElementHandle de qualquer elemento da página e retorna uma lista com todos os produtos que são filhos (imediatos ou não) do elemento passado:
async function getAllProductsFromNode(
    parentNodeHandle: ElementHandle<any>,
): Promise<Product[]> {
    const productHandles = await parentNodeHandle.$$(".pd-prd");

    const products = await Promise.all(
        productHandles.map((handle) => getProduct(handle)),
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
        description: description.replace("\n", " "),
        imageSrc,
    };
}
