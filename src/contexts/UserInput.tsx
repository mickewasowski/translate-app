import { useState, createContext } from "react";
import { LanguageTags } from "../utils/languageTags";
import { translateText } from "../utils/apiRequest";

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

const UserInputProvider = ({ children }) => {
    const [userTextInput, setUserTextInput] = useState('Hello, how are you?');
    const [translated, setTranslated] = useState('');
    const [currentUserLanguage, setCurrentUserLanguage] = useState(buttonsToLoad[1].id);
    const [resultLanguage, setResultLanguage] = useState(buttonsToLoad[2].id);

    const translateUserInput = async () => {
        try {
            const sourceLang = buttonsToLoad.find((x) => x.id === currentUserLanguage)?.langCode;
            const resultLang = buttonsToLoad.find((x) => x.id === resultLanguage)?.langCode;
            if (sourceLang && resultLang) {
                const result = await translateText(userTextInput, sourceLang, resultLang);
                if (result.responseData) {
                    setTranslated(result.responseData.translatedText);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <UserInputContext.Provider value={{
                userTextInput,
                setUserTextInput,
                translated,
                translateUserInput,
                currentUserLanguage,
                setCurrentUserLanguage,
                resultLanguage,
                setResultLanguage
            }}>
            { children }
        </UserInputContext.Provider>
    )
}

export default UserInputProvider;
