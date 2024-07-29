import { useContext, useRef } from 'react';
import LanguageButton from '../buttons/LanguageButton';
import TextArea from '../inputs/TextArea';
import BottomButtonsWrapper from '../buttons/BottomButtonsWrapper';
import './TranslationWrapper.styles.scss';
import { buttonsToLoad, UserInputContext } from '../../contexts/UserInput';
import IconButton from '../buttons/IconButton';

interface IProps {
    type: 'right' | 'left';
}

function TranslationWrapper({ type }: IProps) {
    const textAreaRef = useRef(null);
    const { getStateByContainerType } = useContext(UserInputContext);
    const data = getStateByContainerType(type);
    const isResult = type === 'right';
    const userLanguage = isResult ? data.resultLanguage : data.currentUserLanguage;
    const setLanguage = isResult ? data.setResultLanguage : data.setCurrentUserLanguage;
    const textAreaValue = isResult ? data.translated : data.userTextInput;
    const handleSetUserInput = isResult ? null : data.setUserTextInput;
    const onSwapLanguages = isResult && data.swapLanguages;

    return(
        <div className={`input-wrapper ${isResult ? 'results' : ''}`}>
            <div className='buttons-container'>
                <div>
                    {
                        buttonsToLoad.map((btn) => {
                            return (
                                <LanguageButton
                                    key={btn.id}
                                    innerText={btn.innerText}
                                    currentlySelected={userLanguage === btn.id}
                                    setLanguage={setLanguage}
                                    id={btn.id}
                                />
                            )
                        })
                    }
                </div>
                {
                    isResult &&
                    <IconButton iconUrl={'/src/assets/Horizontal_top_left_main.svg'} onClickHandler={onSwapLanguages}/>
                }
            </div>
            <TextArea currentValue={textAreaValue} setCurrentValue={handleSetUserInput} inputRef={textAreaRef}/>
            <BottomButtonsWrapper renderSubmitButton={type === 'left'} inputRef={textAreaRef}/>
        </div>
    )
}

export default TranslationWrapper;
