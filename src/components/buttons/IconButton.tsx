import { ReactSVG } from "react-svg";
import './IconButton.styles.scss';
import classNames from "classnames";

interface IProps {
    iconUrl: string;
    onClickHandler?: (event) => void;
    textAreaRef?: React.RefAttributes<HTMLTextAreaElement>;
    tooltip: string;
}

function IconButton({ iconUrl, onClickHandler, tooltip }: IProps) {
    const className = classNames({
        'icon-button': true,
    });

    return(
        <button className={className} onClick={onClickHandler}>
            <ReactSVG src={iconUrl} />
            <p id="button-tooltip">{tooltip}</p>
        </button>
    )
}

export default IconButton;
