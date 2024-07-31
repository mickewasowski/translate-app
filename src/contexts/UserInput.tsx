import { useState, createContext, ReactElement } from "react";
import { LanguageTags } from "../utils/languageTags";
import { detectLanguage, translateText } from "../utils/apiRequest";
import { LanguageCodes } from "../utils/NLP-languages";
import { IDetectLanguageResponse } from "../utils/types";

interface IGetStateByContainerTypeReturnValue {
    translated?: string;
    resultLanguage?: string;
    setResultLanguage?: React.Dispatch<React.SetStateAction<string>>;
    swapLanguages?: () => void;
    userTextInput?: string;
    setUserTextInput?: React.Dispatch<React.SetStateAction<string>>;
    currentUserLanguage?: string;
    setCurrentUserLanguage?: React.Dispatch<React.SetStateAction<string>>;
    setTranslated?: React.Dispatch<React.SetStateAction<string>>;
}
interface IUserInputContext {
    getStateByContainerType: (type: 'right' | 'left') => IGetStateByContainerTypeReturnValue;
    translateUserInput: () => Promise<void>;
}

const defaultState: IGetStateByContainerTypeReturnValue = {
    translated: '',
    resultLanguage: 'frenchLanguageBtn',
    setResultLanguage: () => {},
    swapLanguages: () => {},
    userTextInput: 'Hello, how are you?',
    setUserTextInput: () => {},
    currentUserLanguage: 'englishLanguageBtn',
    setCurrentUserLanguage: () => {},
    setTranslated: () => {},
};

const defaultContext: IUserInputContext = {
    getStateByContainerType: (type: 'right' | 'left') => defaultState,
    translateUserInput: async () => {}
};

export const UserInputContext = createContext<IUserInputContext>(defaultContext);

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

interface IProps {
    children: ReactElement;
}

const UserInputProvider = ({ children }: IProps) => {
    const [userTextInput, setUserTextInput] = useState('Hello, how are you?');
    const [translated, setTranslated] = useState('');
    const [currentUserLanguage, setCurrentUserLanguage] = useState(buttonsToLoad[1].id);
    const [resultLanguage, setResultLanguage] = useState(buttonsToLoad[2].id);

    const translateUserInput = async () => {
        try {
            const resultLang = allLanguages.find((x) => x.id === resultLanguage)?.langCode;
            if (currentUserLanguage === allLanguages[0].id) {
                if (resultLang) {
                    const translated: IDetectLanguageResponse = await detectLanguage(userTextInput);
                    const responseLangCode = translated['DetectedLanguage_ThreeLetterCode'];
                    const langCode: string = LanguageCodes[responseLangCode as keyof typeof LanguageCodes];
                    const currentLanguage = allLanguages.find(x => x.langCode === langCode);
                    if (currentLanguage) {
                        setCurrentUserLanguage(currentLanguage.id);
                        const result = await translateText(userTextInput, langCode, resultLang);
                        if (result.responseData) {
                            setTranslated(result.responseData.translatedText);
                        }
                    }
                }
            } else {
                const sourceLang = allLanguages.find((x) => x.id === currentUserLanguage)?.langCode;
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
                    swapLanguages,
                    setTranslated,
                    userTextInput: undefined,
                    setUserTextInput: undefined,
                    currentUserLanguage: undefined,
                    setCurrentUserLanguage: undefined,
                }
            }
            case 'left': {
                return {
                    userTextInput,
                    setUserTextInput,
                    currentUserLanguage,
                    setCurrentUserLanguage,
                    translated: undefined,
                    resultLanguage: undefined,
                    setResultLanguage: undefined,
                    swapLanguages: undefined,
                }
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
