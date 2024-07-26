import { ReactSVG } from "react-svg";
import './TranslateButton.styles.scss';
import { useContext } from "react";
import { UserInputContext } from "../../contexts/UserInput";

function TranslateButton() {
    const { translateUserInput } = useContext(UserInputContext);

    return(
        <button id="translate-button" onClick={translateUserInput}>
            <ReactSVG src="/src/assets/Sort_alfa.svg"/>
            Translate
        </button>
    )
}

export default TranslateButton;
