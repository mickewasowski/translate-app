import classNames from "classnames";
import './LanguageButton.styles.scss';
import { ReactSVG } from "react-svg";
import { useState } from "react";
import { allLanguages } from "../../contexts/UserInput";

interface IProps {
    innerText: string;
    currentlySelected: boolean;
    setLanguage: () => void;
    id: string;
    hasDropdown: boolean;
}

const dropdownArrow = '/src/assets/Expand_down.svg';

function LanguageButton({ innerText, currentlySelected, setLanguage, id, hasDropdown }: IProps) {
    const [expanded, setExpanded] = useState(false);
    const dropDownButtons = allLanguages.slice(3);

    const className = classNames({
        'active-button': currentlySelected,
        'regular': true,
    });


    const handleDropDownClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setExpanded(!expanded);
    }

    const handleSelectLanguage = (event, btnId: string) => {
        event.preventDefault();
        event.stopPropagation();
        setLanguage(btnId);
        setExpanded(!expanded);
    }

    return(
        <div className="language-btn-wrapper">
            <button className={className} onClick={() => setLanguage(id)}>
                { innerText }
                { hasDropdown &&
                    (
                        <span id="dropdown-btn" onClick={handleDropDownClick}>
                            <ReactSVG src={dropdownArrow}/>
                        </span>
                    )
                }
            </button>
            {
                hasDropdown && expanded &&
                (
                    <div className="dropdown-menu">
                        <ul>
                            {
                                dropDownButtons.map((btn) => {
                                    return <li key={btn.id} onClick={(event) => handleSelectLanguage(event, btn.id)}>{btn.innerText}</li>
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default LanguageButton;
