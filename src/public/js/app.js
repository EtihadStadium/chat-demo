const socket = new WebSocket(`ws://${window.location.host}`);
socket.addEventListener("open", () => {
    console.log("✅ You're connected to the server!");
});
socket.addEventListener("message", (message) => {
    console.log(`💌 message : ${message.data.toString("utf8")}`);
});
socket.addEventListener("close", () => {
    console.log("❌ Disconnected from the server!");
});
setTimeout(() => {
    socket.send("Hello!");
}, 10000);
