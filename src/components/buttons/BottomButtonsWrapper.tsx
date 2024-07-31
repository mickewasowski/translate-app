import IconButton from "./IconButton";
import TranslateButton from "./TranslateButton";
import './BottomButtonsWrapper.styles.scss';
import VoiceToText from "../misc/VoiceToText";

const iconButtonsUrls = [
    {
        id: 'speaker',
        url: '/src/assets/sound_max_fill.svg',
        tooltip: 'Listen',
    },
    {
        id: 'copy',
        url: '/src/assets/Copy.svg',
        tooltip: 'Copy',
    }
];

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    inputRef: React.Ref<HTMLTextAreaElement>;
    renderSubmitButton: boolean;
    language?: string;
}

function BottomButtonsWrapper({ renderSubmitButton, inputRef, language }: IProps) {
    const copyToClipboard = () => {
        const value = inputRef?.current?.value;
        navigator.clipboard.writeText(value);
        alert('Copied text to clipboard!');
    }

    const textToSpeech = () => {
        const msg = new SpeechSynthesisUtterance();
        const value = inputRef?.current?.value;
        msg.text = value;
        if (language) msg.lang = language;
        window.speechSynthesis.speak(msg);
    }

    const clickHandler = (buttonId: string) => {
        switch(buttonId) {
            case 'copy': {
                return copyToClipboard;
            }
            case 'speaker': {
                return textToSpeech;
            }
        }
    }

    return(
        <div className="bottom-buttons-container">
            <div className="icon-buttons-container">
                {
                    iconButtonsUrls.map((btn) => {
                        return(
                            <IconButton
                                key={btn.id}
                                iconUrl={btn.url}
                                onClickHandler={clickHandler(btn.id)}
                                tooltip={btn.tooltip}
                            />
                        )
                    })
                }
                { renderSubmitButton && <VoiceToText /> }
            </div>
            {
                renderSubmitButton && <TranslateButton />
            }
        </div>
    )
}

export default BottomButtonsWrapper;
