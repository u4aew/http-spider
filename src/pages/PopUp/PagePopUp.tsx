import { useState, useEffect } from "react";
import { ButtonControl } from "../../components/ButtonControl";

export const PagePopUp = () => {
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    // Загрузите состояние при инициализации компонента
    useEffect(() => {
        //@ts-ignore
        chrome.storage.local.get(['recording', 'paused', 'secondsElapsed'], (result) => {
            if (result.recording) setRecording(result.recording);
            if (result.paused) setPaused(result.paused);
            if (result.secondsElapsed) setSecondsElapsed(result.secondsElapsed);
        });
    }, []);

    useEffect(() => {
        //@ts-ignore
        chrome.storage.local.set({ recording, paused, secondsElapsed });
    }, [recording, paused, secondsElapsed]);

    const onStartRecord = () => {
        setRecording(true);
        setPaused(false);
    };

    const onStopRecord = () => {
        setRecording(false);
        setPaused(false);
    };

    const onPauseRecord = () => {
        if (recording) {
            setPaused(!paused);
        }
    };

    return <div>
        <ButtonControl
            onStart={onStartRecord}
            onStop={onStopRecord}
            onPause={onPauseRecord}
            recording={recording}
            paused={paused}
        />
    </div>
}
