function sendMessageToBackground(message) {
  const event = new CustomEvent('SEND_MESSAGE_TO_BG', { detail: message });
  window.dispatchEvent(event);
}

function getDateTime() {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

const originalXhrOpen = XMLHttpRequest.prototype.open;
const originalXhrSend = XMLHttpRequest.prototype.send;
const originalFetch = window.fetch;

XMLHttpRequest.prototype.open = function (method, url) {
  this._method = method;
  this._url = url;
  return originalXhrOpen.apply(this, arguments);
};

XMLHttpRequest.prototype.send = function (body) {
  const startTime = Date.now();
  this.addEventListener('load', function () {
    const duration = Date.now() - startTime;
    console.log(JSON.stringify(this), '');
    sendMessageToBackground({
      type: 'XHR',
      method: this._method,
      url: this._url,
      dateTime: getDateTime(),
      requestBody: body,
      responseBody: this.responseText,
      status: this.status,
      statusText: this.statusText,
      responseHeaders: this.getAllResponseHeaders(),
      duration: duration,
      responseSize: this.responseText.length,
      async: this.async,
      customHeaders: this.requestHeaders,
    });
  });
  return originalXhrSend.apply(this, arguments);
};

window.fetch = async (...args) => {
  const startTime = Date.now();
  try {
    const response = await originalFetch(...args);
    const duration = Date.now() - startTime;
    const clone = response.clone();
    const body = await clone.text();
    const size = new Blob([body]).size;

    sendMessageToBackground({
      type: 'XHR',
      method: args[1] && args[1].method ? args[1].method : 'GET',
      url: response.url,
      requestBody: args[1] && args[1].body ? args[1].body : null,
      responseBody: body,
      dateTime: getDateTime(),
      status: response.status,
      statusText: response.statusText,
      responseHeaders: JSON.stringify([...response.headers]),
      duration: duration,
      responseSize: size,
      credentials:
        args[1] && args[1].credentials ? args[1].credentials : 'same-origin',
    });
    return response;
  } catch (error) {
    console.error('Fetch interception failed:', error);
    throw error;
  }
};
