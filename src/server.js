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

//backSocket = FE의 frontSocket과 real-time 소통
function handleConnection(backSocket) {
    console.log(backSocket);
}
wss.on("connection", handleConnection);

server.listen(3000, handleListen);