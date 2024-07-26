import classNames from "classnames";
import './LanguageButton.styles.scss';

interface IProps {
    innerText: string;
    currentlySelected: boolean;
    setLanguage: () => void;
    id: string;
}

function LanguageButton({ innerText, currentlySelected, setLanguage, id }: IProps) {
    const className = classNames({
        'active-button': currentlySelected,
        'regular': true,
    });

    return(
        <button className={className} onClick={() => setLanguage(id)}>
            {innerText}
        </button>
    )
}

export default LanguageButton;
