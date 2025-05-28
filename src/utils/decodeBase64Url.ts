export default function decodeBase64Url(encodedUrl: string) {
    return Buffer.from(encodedUrl, "base64url").toString("utf8");
}