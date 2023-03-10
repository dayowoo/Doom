import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();

// pub, js 파일 연결
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// 유저가 /public으로 가면 __dirname + "/pulblic" 보여줌
app.use("/public", express.static(__dirname + "/public"));
// first router
app.get("/", (req, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);


wsServer.on("connection", (socket) => {
    console.log(socket);
    socket.on("enter_room", (msg, done) => {
      console.log(msg);
      setTimeout(() => {
        done();
      }, 10000);
    });
  });


/*
import WebSocket from "ws";
// browser array
const backSockets = [];
// backSocket = FE의 frontSocket과 real-time 소통
// backSocket : 누가 연결했는지 알 수 있음 & 연결한거를 backSocket이란 이름으로 받음
wss.on("connection", (backSocket) => {
//     // 브라우저가 연결되면, 배열에 넣어줌
    backSockets.push(backSocket);
    backSocket["nickname"] = "Anon";
    console.log("Connected to Browser");

//     // 브라우저가 꺼졌을 때
    backSocket.on("close", onSocketClose);

//     // 브라우저가 서버에 보낸 메세지 받기
    backSocket.on("message", (msg) => {
        const message = JSON.parse(msg);

        switch (message.type) {
            case "new_message":
                backSockets.forEach((aSocket) =>
                aSocket.send(`${backSocket.nickname}: ${message.payload}`)
                );
                break;
            case "nickname":
                // socket 안에 뭔가를 저장할 수 있음
                backSocket["nickname"] = message.payload;
                break;
        }
        // backSocket.send(message.toString('utf8'));
    });

    backSocket.send("hello");
});
*/

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);