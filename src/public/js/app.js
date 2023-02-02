// Frontend Javascript

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nicknameForm = document.querySelector("#nickname");
const frontSocket = new WebSocket(`ws://${window.location.host}`);


// element : Server와 연결됐을 때 발생
frontSocket.addEventListener("open", ()=>{
    console.log("Connected to Server");
});

// 서버로부터 메세지 수신
frontSocket.addEventListener("message", (message)=> {
    // 메세지 수신하면 새로운 li 생성
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

// 서버 연결 끊김
frontSocket.addEventListener("close", ()=> {
    console.log("Connected from Server X");
});



function makeMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}


function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    frontSocket.send(makeMessage("nickname", input.value));
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    // json
    frontSocket.send(makeMessage("new_message", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleNicknameSubmit);
messageForm.addEventListener("submit", handleMessageSubmit);



/*
// front -message-> backend : 10초 뒤에 실행
setTimeout(() => {
    frontSocket.send("hello from the browser!");
}, 1000);
*/