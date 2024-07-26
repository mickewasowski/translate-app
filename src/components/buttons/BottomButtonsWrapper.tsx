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

    return(
        <div className="bottom-buttons-container">
            <div className="icon-buttons-container">
                {
                    iconButtonsUrls.map((btn) => {
                        return(
                            <IconButton key={btn.id} iconUrl={btn.url} textAreaRef={btn.id === 'copy' && inputRef} onClickHandler={btn.id === 'copy' && copyToClipboard}/>
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
