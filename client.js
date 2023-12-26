const socket = io();
const form = document.getElementById('sendcont');
const messageInput= document.getElementById('send_msg');
const messageContainter = document.getElementById('messagebox');

//2
const username = prompt("enter your name");

//4
const append =(message, position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainter.appendChild(messageElement);
}

socket.emit("new_user_join",username);
//3
socket.on("user_joined",(username)=>{
    append(`${username} joined this chat`,"center");
})

socket.on("user_left",(username)=>{
    append(`${username} left this chat`,"center");
})


form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
})

socket.on("recieve",(data)=>{
    append(`${data.username} : ${data.message}`, "left");
})