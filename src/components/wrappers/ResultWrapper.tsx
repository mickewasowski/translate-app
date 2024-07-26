import { useState } from "react";
import { buttonsToLoad } from "./InputWrapper";
import LanguageButton from "../buttons/LanguageButton";
import TextArea from "../inputs/TextArea";
import BottomButtonsWrapper from "../buttons/BottomButtonsWrapper";
import IconButton from "../buttons/IconButton";

function ResultWrapper() {
    const [currentLanguage, setCurrentLanguage] = useState(buttonsToLoad[2].id);

    return(
        <div className='input-wrapper results'>
            <div className='buttons-container'>
                <div>
                    {
                        buttonsToLoad.map((btn) => {
                            if (btn.innerText === buttonsToLoad[0].innerText) return;
                            return (
                                <LanguageButton key={btn.id} innerText={btn.innerText} currentlySelected={currentLanguage === btn.id} />
                            )
                        })
                    }
                </div>
                <IconButton iconUrl={'/src/assets/Horizontal_top_left_main.svg'}/>
            </div>
            <TextArea isResult={true}/>
            <BottomButtonsWrapper renderSubmitButton={false} />
        </div>
    )
}

export default ResultWrapper;
