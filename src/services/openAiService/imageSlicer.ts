import sharp from "sharp";

export default async function imageSlicer(
    imageFilePath: string,
    sliceHeight: number,
) {
    const image = sharp(imageFilePath);

    const { width: imageWidth, height: imageHeight } = await image.metadata();

    const numberOfSlices = Math.floor(imageHeight / sliceHeight) + 1;

    const slices = new Array(numberOfSlices).fill(0);

    const imageRegions: sharp.Region[] = slices.map((_value, index) => {
        const isLastSlice = numberOfSlices === index + 1;
        const top = index * sliceHeight;
        const height = isLastSlice ? imageHeight - top : sliceHeight;
        const region = {
            top: top,
            height: height,
            left: 0,
            width: imageWidth,
        };
        return region;
    });

    const sliceImageArray = imageRegions.map(async (imageRegion) => {
        const result = await sharp(imageFilePath)
            .extract(imageRegion)
            .toBuffer();

        return result.toString("base64");
    });

    return await Promise.all(sliceImageArray);
}
