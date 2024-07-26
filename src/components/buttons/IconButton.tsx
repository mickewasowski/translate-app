import { ReactSVG } from "react-svg";
import './IconButton.styles.scss';
import classNames from "classnames";

interface IProps {
    iconUrl: string;
    onClickHandler?: () => void;
    textAreaRef?: React.RefAttributes<HTMLTextAreaElement>;
}

function IconButton({ iconUrl, onClickHandler }: IProps) {
    const className = classNames({
        'icon-button': true,
    });

    return(
        <button className={className} onClick={onClickHandler}>
            <ReactSVG src={iconUrl} />
        </button>
    )
}

export default IconButton;
