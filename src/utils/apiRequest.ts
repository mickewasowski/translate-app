
export const translateText = async (inputText: string, sourceLang: string, resultLang: string) => {
    return fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=${sourceLang}|${resultLang}`)
        .then((res) => res.json())
        .catch((error) => new Error(error));
}

export const detectLanguage = async (inputText: string) => {
    const data = new URLSearchParams({
        textToDetect: inputText
    });

    return fetch('https://api.cloudmersive.com/nlp-v2/language/detect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Apikey': import.meta.env.VITE_CLOUDMERSIVE_API_KEY
        },
        body: data
    })
    .then((res) => res.json())
    .catch((error) => new Error(error));
}
