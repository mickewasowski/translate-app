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
}

function BottomButtonsWrapper({ renderSubmitButton }: IProps) {

    return(
        <div className="bottom-buttons-container">
            <div className="icon-buttons-container">
                {
                    iconButtonsUrls.map((btn) => {
                        return(
                            <IconButton key={btn.id} iconUrl={btn.url} />
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
