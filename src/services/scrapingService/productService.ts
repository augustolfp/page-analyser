import { ElementHandle } from "puppeteer";
import type { Product } from "../../types/index.js";

export async function getCategoryProducts(
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
