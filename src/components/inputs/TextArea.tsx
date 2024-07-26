import { useState } from "react";
import './TextArea.styles.scss';

interface IProps {
    isResult: boolean;
}

function TextArea({ isResult }: IProps) {
    const initialText = isResult ? '' : 'Hello, how are you?';
    const [currentText, setCurrentText] = useState(initialText);

    const handleTyping = ({ target: { value } }) => {
        if (value.length > 500) return;
        setCurrentText(value);
    }

    return(
        <div className="textarea-container">
            <textarea className="user-type-input" value={currentText} onChange={handleTyping} />
            <p id="letter-counter">{currentText.length}/500</p>
        </div>
    )
}

export default TextArea;
