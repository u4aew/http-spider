import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonControl } from '../../components/ButtonControl';
import { stopRecordHttp, startRecordHttp } from '../../utils';
import styles from './RecordPage.module.scss';

export const RecordPage = () => {
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
    startRecordHttp();
  };

  const onStopRecord = () => {
    setRecording(false);
    setPaused(false);
    stopRecordHttp();
  };

  const onPauseRecord = () => {
    if (recording) {
      setPaused(!paused);
    }
  };

  return (
    <div className={styles.box}>
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
