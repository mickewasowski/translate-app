import './TextArea.styles.scss';

interface IProps {
    currentValue: string;
    setCurrentValue?: (input: string) => void;
}

function TextArea({ currentValue, setCurrentValue }: IProps) {
    const handleTyping = ({ target: { value } }) => {
        if (value.length > 500) return;
        setCurrentValue && setCurrentValue(value);
    }

    return(
        <div className="textarea-container">
            <textarea className="user-type-input" value={currentValue} onChange={handleTyping} />
            <p id="letter-counter">{currentValue?.length}/500</p>
        </div>
    )
}

export default TextArea;
