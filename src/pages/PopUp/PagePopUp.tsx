import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonControl } from '../../components/ButtonControl';
import styles from './PagePopUp.module.scss';

export const PagePopUp = () => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    chrome.storage.local.get(
      ['recording', 'paused', 'secondsElapsed'],
      result => {
        if (result.recording) setRecording(result.recording);
        if (result.paused) setPaused(result.paused);
        if (result.secondsElapsed) setSecondsElapsed(result.secondsElapsed);
      },
    );
  }, []);

  useEffect(() => {
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

  return (
    <div>
      <div className={styles.title}>{t('title')}</div>
      <ButtonControl
        onStart={onStartRecord}
        onStop={onStopRecord}
        onPause={onPauseRecord}
        recording={recording}
        paused={paused}
      />
    </div>
  );
};
