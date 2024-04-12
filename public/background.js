const MessageType = {
  XHR: 'XHR',
  REC_START: 'REC_START',
  REC_PAUSE: 'REC_PAUSE',
  REC_STOP: 'REC_STOP',
};

const recordingState = {
  isRecording: false,
  records: [],
};

function handleXHRMessage(request) {
  if (recordingState.isRecording) {
    recordingState.records.push(request);
  }
  console.log('Received message from content script:', request);
}

function startRecording() {
  recordingState.isRecording = true;
}

function pauseRecording() {
  recordingState.isRecording = false;
}

function stopRecording() {
  recordingState.isRecording = false;
  chrome.storage.local.set({ records: recordingState.records }, () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('index.html/#schema'),
    });
    recordingState.records = [];
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case MessageType.XHR:
      handleXHRMessage(request);
      break;
    case MessageType.REC_START:
      startRecording();
      break;
    case MessageType.REC_PAUSE:
      pauseRecording();
      break;
    case MessageType.REC_STOP:
      stopRecording();
      break;
    default:
      console.warn('Unrecognized message type:', request.type);
  }
});
