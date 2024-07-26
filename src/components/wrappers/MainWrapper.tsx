import InputWrapper from "./InputWrapper";
import ResultWrapper from "./ResultWrapper";
import './MainWrapper.styles.scss';

function MainWrapper() {
    return(
        <section className="main-container">
            <div id="logo-container">
                <img src="/src/assets/logo.svg" alt="logo" />
            </div>
            <div className="wrappers-container">
                <InputWrapper />
                <ResultWrapper />
            </div>
        </section>
    )
}

export default MainWrapper;
