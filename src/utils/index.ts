import { MessageTypes } from '../types';
export const startRecordHttp = () => {
  chrome.runtime.sendMessage({ type: MessageTypes.REC_START });
};

export const stopRecordHttp = () => {
  chrome.runtime.sendMessage({ type: MessageTypes.REC_STOP });
};

export const getStore = () => {

}
