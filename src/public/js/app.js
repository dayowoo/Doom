// Frontend Javascript

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const frontSocket = new WebSocket(`ws://${window.location.host}`);

// element : Server와 연결됐을 때 발생
frontSocket.addEventListener("open", ()=>{
    console.log("Connected to Server");
});

// 서버로부터 메세지 수신
frontSocket.addEventListener("message", (message)=> {
    console.log("New Message: ", message.data, "from the server");
});

// 서버 연결 끊김
frontSocket.addEventListener("close", ()=> {
    console.log("Connected from Server X");
});

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    frontSocket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);



/*
// front -message-> backend : 10초 뒤에 실행
setTimeout(() => {
    frontSocket.send("hello from the browser!");
}, 1000);
*/