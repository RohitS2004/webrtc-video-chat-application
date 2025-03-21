import { WebSocket } from "ws";

export class User {

    constructor (
        private socket: WebSocket,
        private roomId: string
    ) {
        this.socket = socket;
        this.roomId = roomId;
    }

    getSocket = () => this.socket;
    getRoomId = () => this.roomId;

    setRoomId = (roomId: string) => {
        this.roomId = roomId;
    }
    
}