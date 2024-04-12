function sendMessageToBackground(message) {
  const event = new CustomEvent('SEND_MESSAGE_TO_BG', { detail: message });
  window.dispatchEvent(event);
}

const originalXhrOpen = XMLHttpRequest.prototype.open;
const originalXhrSend = XMLHttpRequest.prototype.send;
const originalFetch = window.fetch;

XMLHttpRequest.prototype.open = function (method, url) {
  this._url = url;
  return originalXhrOpen.apply(this, arguments);
};

XMLHttpRequest.prototype.send = function (body) {
  this.addEventListener('load', function () {
    sendMessageToBackground({
      type: 'XHR',
      url: this._url,
      requestBody: body,
      responseBody: this.responseText,
    });
  });
  return originalXhrSend.apply(this, arguments);
};

window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    const clone = response.clone();
    const body = await clone.text();
    console.log('Fetch to:', response.url, 'response:', body);

    sendMessageToBackground({
      type: 'FETCH',
      url: response.url,
      requestBody: args[1] && args[1].body ? args[1].body : null,
      responseBody: body,
    });
    return response;
  } catch (error) {
    console.error('Fetch interception failed:', error);
    throw error;
  }
};
