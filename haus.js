let messages = document.getElementById('messages');
let sendButton = document.getElementById('send-btn');
sendButton.addEventListener('click', sendUserMessage);
getMessagesFromServer();

// Шаг 1:
// Получить сообщения  с сервера
async function getMessagesFromServer() {
  // Получаем ассинхронный ответ
  let response = await fetch(
    'https://fchatiavi.herokuapp.com/get/test/?offset=0&limit=100000'
  );
  // Декодируем его из строки в объект javascrip
  response = await response.json();

  let allMessagesHTML = '';
  for (let i = 0; i < response.length; i++) {
    let messageData = response[i];
    // Создать верстаку меседжа
    let message = `
     <div class="message">
         <div class="message-nickname"> ${messageData.Name} </div>
         <div class="message-text"> ${messageData.Message} </div>
     </div>
    `;
    allMessagesHTML = allMessagesHTML + message;
  }

  // Добавить в messages-wrapper письма.
  messages.innerHTML = allMessagesHTML;
}

async function sendUserMessage() {
  // Получить что написал пользователь в поле nickname
  let userMessage = document.getElementById('message-input').value;
  if (userMessage.length === 0) {
    alert('Ты должен вести сообщение!');
    return;
  }

  await fetch('https://fchatiavi.herokuapp.com/send/test/', {
    method: 'POST',
    body: JSON.stringify({
      Name: 'Beni',
      Message: userMessage,
    }),
  });

  getMessagesFromServer();
  // по нажатию на кнопку отправить - отправить на сервер nickname:message N сделать шаг 1
}
