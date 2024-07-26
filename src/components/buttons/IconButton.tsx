import { ReactSVG } from "react-svg";
import './IconButton.styles.scss';
import classNames from "classnames";

interface IProps {
    iconUrl: string;
}

function IconButton({ iconUrl }: IProps) {
    const className = classNames({
        'icon-button': true,
    });

    return(
        <button className={className}>
            <ReactSVG src={iconUrl} />
        </button>
    )
}

export default IconButton;
