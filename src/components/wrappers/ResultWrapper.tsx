import { useContext, useRef } from "react";
import LanguageButton from "../buttons/LanguageButton";
import TextArea from "../inputs/TextArea";
import BottomButtonsWrapper from "../buttons/BottomButtonsWrapper";
import IconButton from "../buttons/IconButton";
import { buttonsToLoad, UserInputContext } from "../../contexts/UserInput";

function ResultWrapper() {
    const { translated, resultLanguage, setResultLanguage, swapLanguages } = useContext(UserInputContext);
    const textAreaRef = useRef(null);

    return(
        <div className='input-wrapper results'>
            <div className='buttons-container'>
                <div>
                    {
                        buttonsToLoad.map((btn) => {
                            if (btn.innerText === buttonsToLoad[0].innerText) return;
                            return (
                                <LanguageButton
                                    key={btn.id}
                                    innerText={btn.innerText}
                                    currentlySelected={resultLanguage === btn.id}
                                    setLanguage={setResultLanguage}
                                    id={btn.id}
                                />
                            )
                        })
                    }
                </div>
                <IconButton iconUrl={'/src/assets/Horizontal_top_left_main.svg'} onClickHandler={swapLanguages}/>
            </div>
            <TextArea currentValue={translated} inputRef={textAreaRef}/>
            <BottomButtonsWrapper renderSubmitButton={false} inputRef={textAreaRef}/>
        </div>
    )
}

export default ResultWrapper;
