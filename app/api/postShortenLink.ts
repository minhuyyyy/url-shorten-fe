
async function postShortenLink(params: FormData) {
    const formData = params.get('expirationDate')
    let expirationDate;
    if (formData !== null && typeof formData == 'string') {
        const date = new Date(formData)
        expirationDate = date;
    } else expirationDate = null
    const data = await fetch('http://localhost:8080/api/urls/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            originalURL: params.get('originalUrl'),
            shortenedURL: params.get('shortCode'),
            expirationDate: expirationDate,
            password: params.get('password')
        }),
    })
    if (!data.ok) {
        const errorData = await data.json();
        throw new Error(errorData.error);
    }
    return await data.json();
}

export default postShortenLink;