export enum MessageTypes {
  REC_START = 'REC_START',
  REC_PAUSE = 'REC_PAUSE',
  REC_STOP = 'REC_STOP',
}

export type Record = {
  url: string;
  method: string;
  status: number;
  statusText: string;
  dateTime: string;
  duration: number;
  responseSize: number;
  type: string;
  responseBody: string;
  requestBody: string;
  responseHeaders: string;
};
