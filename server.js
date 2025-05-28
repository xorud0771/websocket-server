// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  console.log("✅ 클라이언트 연결됨!");

  ws.on("message", function incoming(message) {
    console.log("📨 받은 메시지:", message.toString());

    // 브로드캐스트
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 서버 실행 중 (포트: ${PORT})`);
});
