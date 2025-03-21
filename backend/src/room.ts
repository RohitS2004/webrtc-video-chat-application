import { WebSocket } from "ws";
import { User } from "./user";

export class Room {

    constructor (
        private roomId: string,
        private remoteOffer: RTCSessionDescription,
        private users: User[],
        private maxCount: number,
        private remoteAnswer: RTCSessionDescription | null,
        private currentCount: number,
    ) {
        this.roomId = roomId;
        this.remoteOffer = remoteOffer;
        this.users = users;
        this.maxCount = maxCount;
        this.remoteAnswer = remoteAnswer;
        this.currentCount = currentCount;
    }

    getRoomId = () => this.roomId;
    getRemoteOffer = () => this.remoteOffer;
    getUsers = () => this.users;
    getMaxCount = () => this.maxCount;
    getRemoteAnswer = () => this.remoteAnswer;
    getSingleUser = (socket: WebSocket) => this.users.find(u => u.getSocket() === socket);
    getCurrentCount = () => this.users.length;

    addUser = (user: User) => {
        this.users.push(user);
    }

    updateCount = () => {
        this.currentCount = this.users.length;
    }

    setRemoteAnswer = (answer: RTCSessionDescription) => {
        this.remoteAnswer = answer;
    }

}