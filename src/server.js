import { Socket } from "dgram";
import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

// pub, js 파일 연결
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// 유저가 /public으로 가면 __dirname + "/pulblic" 보여줌
app.use("/public", express.static(__dirname + "/public"));


// first router
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log("Listeneing on http://localhost:3000");

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

function onSocketClose() {
    console.log("Connected to Browser");
};

function onSocketMessage() {
    console.log(message.toString('utf8'));
}

// backSocket = FE의 frontSocket과 real-time 소통
// backSocket : 누가 연결했는지 알 수 있음 & 연결한거를 backSocket이란 이름으로 받음
wss.on("connection", (backSocket) => {
    console.log("Connected to Browser");

    // 브라우저가 꺼졌을 때
    backSocket.on("close", onSocketClose);

    // 브라우저가 서버에 보낸 메세지 받기
    backSocket.on("message", onSocketMessage);

    backSocket.send("hello");
});

server.listen(3000, handleListen);