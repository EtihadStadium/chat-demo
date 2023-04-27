const socket = new WebSocket(`ws://${window.location.host}`);
const nicknameForm = document.querySelector("#name");
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
function createMessage(type, payload) {
    const message = { type, payload };
    return JSON.stringify(message);
}
socket.addEventListener("open", () => {
    console.log("✅ You're connected to the server!");
});
socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});
socket.addEventListener("close", () => {
    console.log("❌ Disconnected from the server!");
});
nicknameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(createMessage("nickname"), input.value);
});
messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(createMessage("new_message", input.value));
    input.value = "";
});
