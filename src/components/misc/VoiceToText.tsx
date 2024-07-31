import { useContext, useState } from "react";
import IconButton from "../buttons/IconButton";
import { buttonsToLoad, UserInputContext } from "../../contexts/UserInput";

function VoiceToText() {
    const [isRecording, setIsRecording] = useState(false);
    const iconBtnUrl = !isRecording ? "/src/assets/Record.svg" : "/src/assets/Stop.svg";
    const { getStateByContainerType } = useContext(UserInputContext);
    const { setUserTextInput, currentUserLanguage } = getStateByContainerType('left');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const mic = new SpeechRecognition();
    mic.continuous = true;
    mic.interimResults = true;
    const language = buttonsToLoad.find(x => x.id === currentUserLanguage);
    mic.lang = language?.langCode as string;

    const startRecording = () => {
        if (!language?.langCode) {
            alert('Please select a language to detect your speech!');
            return;
        }

        setIsRecording(true);
        mic.start();

        mic.onresult = (event) => {
            console.log(typeof event)
            const transcript = Array.from(event.results)
              .map((result) => result[0])
              .map((result) => result.transcript)
              .join("");

            if(setUserTextInput) setUserTextInput(transcript);

            mic.onerror = (event) => {
              console.log(event.error);
            };
        };
    }

    const stopRecording = async () => {
        setIsRecording(false);
        mic.stop();
    }

    const recordVoice = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }

    return (
        <IconButton iconUrl={iconBtnUrl} onClickHandler={recordVoice} tooltip={!isRecording ? 'Record' : 'Stop recording'}/>
    )
}

export default VoiceToText;
