import express from "express";
import http from "http";
import { parse } from "path";
import WebSocket from "ws";
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous";
    console.log("✅ You're connected to a browser!");
    socket.on("close", () => {
        console.log("❌ Disconnected from the browser!");
    });
    socket.on("message", (message) => {
        const parsed = JSON.parse(message);
        switch (parsed.type) {
            case "nickname":
                socket["nickname"] = parsed.payload;
                break;
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`💌 ${socket.nickname} : ${parsed.payload}`));
                break;
        }
    });
});
server.listen(3000, handleListen);
