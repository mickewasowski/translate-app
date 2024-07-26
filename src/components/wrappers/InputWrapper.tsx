import { useContext, useRef } from 'react';
import LanguageButton from '../buttons/LanguageButton';
import TextArea from '../inputs/TextArea';
import BottomButtonsWrapper from '../buttons/BottomButtonsWrapper';
import './InputWrapper.styles.scss';
import { buttonsToLoad, UserInputContext } from '../../contexts/UserInput';

function InputWrapper() {
    const { userTextInput, setUserTextInput, currentUserLanguage, setCurrentUserLanguage } = useContext(UserInputContext);
    const textAreaRef = useRef(null);

    return(
        <div className='input-wrapper'>
            <div className='buttons-container'>
                {
                    buttonsToLoad.map((btn) => {
                        return (
                            <LanguageButton
                                key={btn.id}
                                innerText={btn.innerText}
                                currentlySelected={currentUserLanguage === btn.id}
                                setLanguage={setCurrentUserLanguage}
                                id={btn.id}
                            />
                        )
                    })
                }
            </div>
            <TextArea currentValue={userTextInput} setCurrentValue={setUserTextInput} inputRef={textAreaRef}/>
            <BottomButtonsWrapper renderSubmitButton={true} inputRef={textAreaRef}/>
        </div>
    )
}

export default InputWrapper;
