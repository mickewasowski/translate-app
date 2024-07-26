
export const translateText = async (inputText: string, sourceLang: string, resultLang: string) => {
    return fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=${sourceLang}|${resultLang}`)
        .then((res) => res.json())
        .catch((error) => new Error(error));
}
