const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
socket.addEventListener("open", () => {
    console.log("✅ You're connected to the server!");
});
socket.addEventListener("message", (message) => {
    console.log(`💌 message : ${message.data.toString("utf8")}`);
});
socket.addEventListener("close", () => {
    console.log("❌ Disconnected from the server!");
});
messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
});
