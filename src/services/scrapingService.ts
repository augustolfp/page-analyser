import puppeteer, { ElementHandle, Page } from "puppeteer";

interface CategoryData {
    categoryTitle: string;
    categoryHandle: ElementHandle<any>;
}

export async function scrapePageData(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // const categoryHandles = await page.$$(".pd-prd-group, pd-prd-group-loop");

    // const categoryTitles = await getCategoryTitles(categoryHandles);

    const categoriesData = await getCategoriesData(page);

    console.log(categoriesData);

    const productHandlesByCategory = await Promise.all(
        categoriesData.map(async ({ categoryHandle, categoryTitle }) => {
            const categoryProductHandles = await categoryHandle.$$(".pd-prd");

            return {
                categoryTitle,
                productHandles: categoryProductHandles,
            };
        }),
    );

    const productTitlesByCategory = await Promise.all(
        productHandlesByCategory.map(
            async ({ categoryTitle, productHandles }) => {
                const productTitles = await Promise.all(
                    productHandles.map(async (productHandle) => {
                        const productTitle: string = await productHandle.$eval(
                            ".pd-prd-info-title",
                            (node) => node.innerText,
                        );
                        return productTitle;
                    }),
                );

                return {
                    categoryTitle,
                    productTitles,
                };
            },
        ),
    );

    await browser.close();
}

async function getCategoriesData(page: Page): Promise<CategoryData[]> {
    const categoryHandles = await page.$$(".pd-prd-group, pd-prd-group-loop");

    const categoryTitles = await Promise.all(
        categoryHandles.map((categoryHandle) => {
            const categoryTitle: Promise<string> = categoryHandle.$eval(
                ".pd-prd-group-title span",
                (node) => node.innerText,
            );

            return categoryTitle;
        }),
    );

    const categoriesData = categoryHandles.map((categoryHandle, index) => {
        return {
            categoryHandle,
            categoryTitle: categoryTitles[index],
        };
    });

    return categoriesData;
}
