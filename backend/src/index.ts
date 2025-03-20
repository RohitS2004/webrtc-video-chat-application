import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({
    port: 8080
})

wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected!");

    

    ws.on("close", () => {
        console.log("Client disconnected!");
    })
})