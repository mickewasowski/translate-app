import classNames from "classnames";
import './LanguageButton.styles.scss';

interface IProps {
    innerText: string;
    currentlySelected: boolean;
}

function LanguageButton({ innerText, currentlySelected }: IProps) {
    const className = classNames({
        'active-button': currentlySelected,
        'regular': true,
    });

    return(
        <button className={className}>
            {innerText}
        </button>
    )
}

export default LanguageButton;
