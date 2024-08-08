const socket = io();
let user;
let input = document.querySelector('#input_message');
let messages = document.querySelector('.messages');
do{
    user = prompt("Enter your name:");
}while(!user)

input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
});
function sendMessage(message){
    let msg = {
        user : user,
        message : message.trim()
    }
    appendMessage(msg, 'outgoing');
    input.value = '';
    // Sending the messsage to the server...
    socket.emit('message', msg);
}

function appendMessage(msg , type){
    let message_div = document.createElement('div');
    let className = type;
    message_div.classList.add(className , 'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>`;
    
    message_div.innerHTML = markup;
    messages.appendChild(message_div);
}

//Receiving the message 

socket.on('message', (msg) => {
    appendMessage(msg , 'incoming');
});
