// Слушаем пользовательские события, отправленные внедренным скриптом
window.addEventListener('SendMessageToBackground', function(event) {
    // Получаем данные сообщения из события
    const message = event.detail;
    // Пересылаем сообщение в фоновый скрипт
    chrome.runtime.sendMessage(message);
});


var s = document.createElement('script');
s.src = chrome.runtime.getURL('scripts/attach.js');
s.onload = function() {
    this.remove(); // После загрузки скрипта, удаляем его, чтобы не оставлять следы в DOM.
};
(document.head || document.documentElement).appendChild(s);
