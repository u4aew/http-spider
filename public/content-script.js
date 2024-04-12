window.addEventListener('SEND_MESSAGE_TO_BG', function (event) {
  const message = event.detail;
  chrome.runtime.sendMessage(message);
});

var s = document.createElement('script');
s.src = chrome.runtime.getURL('scripts/attach.js');
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);
