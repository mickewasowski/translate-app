import { ReactSVG } from "react-svg";
import './TranslateButton.styles.scss';

function TranslateButton() {
    
    return(
        <button id="translate-button">
            <ReactSVG src="/src/assets/Sort_alfa.svg"/>
            Translate
        </button>
    )
}

export default TranslateButton;
