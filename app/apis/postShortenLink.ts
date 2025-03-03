import { ShortLinkValues } from "../contracts/interfaces/shortLinkValues";

async function postShortenLink(params: ShortLinkValues) {
    const data = await fetch('http://localhost:8080/api/urls/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            originalURL: params.originalUrl,
            shortenedURL: params.shortCode
        }),
    })
    if (!data.ok) {
        const errorData = await data.json();
        throw new Error(errorData.error);
    }
    return await data.json();
}

export default postShortenLink;