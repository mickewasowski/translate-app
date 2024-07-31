import { useContext, useRef } from 'react';
import LanguageButton from '../buttons/LanguageButton';
import TextArea from '../inputs/TextArea';
import BottomButtonsWrapper from '../buttons/BottomButtonsWrapper';
import './TranslationWrapper.styles.scss';
import { allLanguages, buttonsToLoad, UserInputContext } from '../../contexts/UserInput';
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

    const renderButtons = () => {
        const dropDownLanguage = allLanguages.slice(4).find((x) => x.id === userLanguage);
        if (dropDownLanguage) {
            return buttonsToLoad.map((btn) => {
                if (btn.id === buttonsToLoad[3].id) {
                    return (
                        <LanguageButton
                            key={dropDownLanguage.id}
                            innerText={dropDownLanguage.innerText}
                            currentlySelected={true}
                            setLanguage={setLanguage}
                            id={dropDownLanguage.id}
                            hasDropdown={true}
                        />
                    )
                }
    
                return (
                    <LanguageButton
                        key={btn.id}
                        innerText={btn.innerText}
                        currentlySelected={userLanguage === btn.id}
                        setLanguage={setLanguage}
                        id={btn.id}
                        hasDropdown={false}
                    />
                )
            })
        }

        return buttonsToLoad.map((btn) => {
            if (btn.id === buttonsToLoad[3].id) {
                return (
                    <LanguageButton
                        key={btn.id}
                        innerText={btn.innerText}
                        currentlySelected={userLanguage === btn.id}
                        setLanguage={setLanguage}
                        id={btn.id}
                        hasDropdown={true}
                    />
                )
            }

            return (
                <LanguageButton
                    key={btn.id}
                    innerText={btn.innerText}
                    currentlySelected={userLanguage === btn.id}
                    setLanguage={setLanguage}
                    id={btn.id}
                    hasDropdown={false}
                />
            )
        })
    }

    return(
        <div className={`input-wrapper ${isResult ? 'results' : ''}`}>
            <div className='buttons-container'>
                <div>
                    {
                        renderButtons()
                    }
                </div>
                {
                    isResult &&
                    <IconButton iconUrl={'/src/assets/Horizontal_top_left_main.svg'} onClickHandler={onSwapLanguages} tooltip='Swap languages'/>
                }
            </div>
            <TextArea currentValue={textAreaValue} setCurrentValue={handleSetUserInput} inputRef={textAreaRef}/>
            <BottomButtonsWrapper renderSubmitButton={!isResult} inputRef={textAreaRef}/>
        </div>
    )
}

export default TranslationWrapper;
