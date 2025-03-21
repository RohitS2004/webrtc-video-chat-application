import { WebSocketServer, WebSocket } from "ws";
import { IRequest } from "./request.type";
import { handleAnswer, handleCreateRoom, handleIceCandidate, handleJoinRoom } from "./handler";
import { Manager } from "./manager";

const wss = new WebSocketServer({
    port: 8080,
});

export const manager = new Manager([]);

wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected!");

    ws.on("message", (message) => {
        const data: IRequest = JSON.parse(message.toString());

        switch (data.type) {
            case "create": {
                handleCreateRoom(ws, data.payload);
                break;
            }

            case "join": {
                handleJoinRoom(ws, data.payload);
                break;
            }

            case "answer": {
                handleAnswer(ws, data.payload);
                break;
            }

            case "ice-candidate": {
                handleIceCandidate(ws, data.payload);
                break;
            }
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected!");
    });
});
