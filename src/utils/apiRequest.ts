import { IDetectLanguageResponse, ITranslatedResponse } from "./types";

/**
 * Method which takes a text, a source language and a response language and returns a match of translations.
 * @param inputText text to translate
 * @param sourceLang the language of the text
 * @param resultLang the language to translate the text into
 * @returns {Promise<ITranslatedResponse>}
 */
export const translateText = async (inputText: string, sourceLang: string, resultLang: string): Promise<ITranslatedResponse> => {
    return fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=${sourceLang}|${resultLang}`)
        .then((res) => res.json())
        .catch((error) => new Error(error));
}

/**
 * Method which detects in what language a text is written.
 * @param inputText the text you want to get the language from
 * @returns {Promise<IDetectLanguageResponse>}
 */
export const detectLanguage = async (inputText: string): Promise<IDetectLanguageResponse> => {
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
