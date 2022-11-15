
// const WebSocket = require('ws');
//  const WebSocket = require('ws');
export const ws = new WebSocket("ws://localhost:8082");
ws.addEventListener("open", (event) => {
    console.log("Client connected to server");

});
// ws.addEventListener('message', (event) => {
//     console.log('Message from server ', event.data);
// });
