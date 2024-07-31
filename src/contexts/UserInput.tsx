import { useState, createContext } from "react";
import { LanguageTags } from "../utils/languageTags";
import { detectLanguage, translateText } from "../utils/apiRequest";
import { languageCodes } from "../utils/NLP-languages";

export const UserInputContext = createContext(null);

export const buttonsToLoad = [
    {
        id: 'detectLanguageBtn',
        innerText: 'Detect language',
    },
    {
        id: 'englishLanguageBtn',
        innerText: 'English',
        langCode: LanguageTags.en
    },
    {
        id: 'frenchLanguageBtn',
        innerText: 'French',
        langCode: LanguageTags.fr
    },
    {
        id: 'spanishLanguageBtn',
        innerText: 'Spanish',
        langCode: LanguageTags.es
    }
];

export const allLanguages = [
    {
        id: 'detectLanguageBtn',
        innerText: 'Detect language',
    },
    {
        id: 'englishLanguageBtn',
        innerText: 'English',
        langCode: LanguageTags.en
    },
    {
        id: 'frenchLanguageBtn',
        innerText: 'French',
        langCode: LanguageTags.fr
    },
    {
        id: 'spanishLanguageBtn',
        innerText: 'Spanish',
        langCode: LanguageTags.es
    },
    {
        id: 'danishLanguageBtn',
        innerText: 'Danish',
        langCode: LanguageTags.da
    },
    {
        id: 'germanLanguageBtn',
        innerText: 'German',
        langCode: LanguageTags.de
    },
    {
        id: 'italianLanguageBtn',
        innerText: 'Italian',
        langCode: LanguageTags.it
    },
    {
        id: 'japaneseLanguageBtn',
        innerText: 'Japanese',
        langCode: LanguageTags.ja
    },
    {
        id: 'koreanLanguageBtn',
        innerText: 'Korean',
        langCode: LanguageTags.ko
    },
    {
        id: 'dutchLanguageBtn',
        innerText: 'Dutch',
        langCode: LanguageTags.nl
    },
    {
        id: 'norwegianLanguageBtn',
        innerText: 'Norwegian',
        langCode: LanguageTags.no
    },
    {
        id: 'portugueseLanguageBtn',
        innerText: 'Portuguese',
        langCode: LanguageTags.pt
    },
    {
        id: 'russianLanguageBtn',
        innerText: 'Russian',
        langCode: LanguageTags.ru
    },
    {
        id: 'swedishLanguageBtn',
        innerText: 'Swedish',
        langCode: LanguageTags.sv
    },
    {
        id: 'chineseLanguageBtn',
        innerText: 'Chinese',
        langCode: LanguageTags.zh
    },
];

const UserInputProvider = ({ children }) => {
    const [userTextInput, setUserTextInput] = useState('Hello, how are you?');
    const [translated, setTranslated] = useState('');
    const [currentUserLanguage, setCurrentUserLanguage] = useState(buttonsToLoad[1].id);
    const [resultLanguage, setResultLanguage] = useState(buttonsToLoad[2].id);

    const translateUserInput = async () => {
        try {
            if (currentUserLanguage === allLanguages[0].id) {
                const resultLang = allLanguages.find((x) => x.id === resultLanguage)?.langCode;
                if (resultLang) {
                    const translated = await detectLanguage(userTextInput);
                    const langCode = languageCodes[translated['DetectedLanguage_ThreeLetterCode']];
                    const currentLanguage = allLanguages.find(x => x.langCode === langCode);
                    if (currentLanguage) {
                        setCurrentUserLanguage(currentLanguage.id);
                        //const sourceLang = buttonsToLoad.find((x) => x.id === currentUserLanguage)?.langCode;
                        const result = await translateText(userTextInput, langCode, resultLang);
                        if (result.responseData) {
                            setTranslated(result.responseData.translatedText);
                        }
                    }
                }
            } else {
                const sourceLang = allLanguages.find((x) => x.id === currentUserLanguage)?.langCode;
                const resultLang = allLanguages.find((x) => x.id === resultLanguage)?.langCode;
                if (sourceLang && resultLang) {
                    const result = await translateText(userTextInput, sourceLang, resultLang);
                    if (result.responseData) {
                        setTranslated(result.responseData.translatedText);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const swapLanguages = () => {
        const temp = currentUserLanguage;
        setCurrentUserLanguage(resultLanguage);
        setResultLanguage(temp);
        const tempInput = userTextInput;
        setUserTextInput(translated);
        setTranslated(tempInput);
    }

    const getStateByContainerType = (type: 'right' | 'left') => {
        switch(type) {
            case 'right': {
                return {
                    translated,
                    resultLanguage,
                    setResultLanguage,
                    swapLanguages
                }
            }
            case 'left': {
                return {
                    userTextInput,
                    setUserTextInput,
                    currentUserLanguage,
                    setCurrentUserLanguage
                }
            }
            default: {
                return null;
            }
        }
    }

    return(
        <UserInputContext.Provider value={{
                getStateByContainerType,
                translateUserInput
            }}>
            { children }
        </UserInputContext.Provider>
    )
}

export default UserInputProvider;
