import IconButton from "./IconButton";
import TranslateButton from "./TranslateButton";
import './BottomButtonsWrapper.styles.scss';

const iconButtonsUrls = [
    {
        id: 'speaker',
        url: '/src/assets/sound_max_fill.svg'
    },
    {
        id: 'copy',
        url: '/src/assets/Copy.svg'
    }
];

interface IProps {
    renderSubmitButton: boolean;
    inputRef: React.RefAttributes<HTMLTextAreaElement>;
}

function BottomButtonsWrapper({ renderSubmitButton, inputRef }: IProps) {

    const copyToClipboard = () => {
        const value = inputRef?.current?.value;
        navigator.clipboard.writeText(value);
        alert('Copied text to clipboard!');
    }

    const textToSpeech = () => {
        const msg = new SpeechSynthesisUtterance();
        const value = inputRef?.current?.value;
        msg.text = value;
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
            default:
                return;
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
                                textAreaRef={inputRef}
                                onClickHandler={clickHandler(btn.id)}/>
                        )
                    })
                }
            </div>
            {
                renderSubmitButton && <TranslateButton />
            }
        </div>
    )
}

export default BottomButtonsWrapper;
