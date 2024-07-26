import { useState } from 'react';
import LanguageButton from '../buttons/LanguageButton';
import TextArea from '../inputs/TextArea';
import BottomButtonsWrapper from '../buttons/BottomButtonsWrapper';
import './InputWrapper.styles.scss';

export const buttonsToLoad = [
    {
        id: 'detectLanguageBtn',
        innerText: 'Detect language'
    },
    {
        id: 'englishLanguageBtn',
        innerText: 'English'
    },
    {
        id: 'frenchLanguageBtn',
        innerText: 'French'
    },
    {
        id: 'spanishLanguageBtn',
        innerText: 'Spanish'
    }
];
function InputWrapper() {
    const [currentLanguage, setCurrentLanguage] = useState(buttonsToLoad[1].id);

    return(
        <div className='input-wrapper'>
            <div className='buttons-container'>
                {
                    buttonsToLoad.map((btn) => {
                        return (
                            <LanguageButton key={btn.id} innerText={btn.innerText} currentlySelected={currentLanguage === btn.id} />
                        )
                    })
                }
            </div>
            <TextArea />
            <BottomButtonsWrapper renderSubmitButton={true} />
        </div>
    )
}

export default InputWrapper;
