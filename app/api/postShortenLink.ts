
async function postShortenLink(params: FormData) {
    console.log("🚀 ~ postShortenLink ~ params:", params)
    const data = await fetch('http://localhost:8080/api/urls/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            originalURL: params.get('originalUrl'),
            shortenedURL: params.get('shortCode'),
            expiredOn: params.get('expiredDate')
        }),
    })
    if (!data.ok) {
        const errorData = await data.json();
        throw new Error(errorData.error);
    }
    return await data.json();
}

export default postShortenLink;