// Manager will be used to manage the total rooms managed by the server,
// add a room, remove a room, get a specific room, get all rooms, if the room is not found then return an error message.

import { Room } from "./room";

export class Manager {
    constructor (
        private rooms: Room[]
    ) {
        this.rooms = rooms;
    }

    addRoom = (room: Room) => {
        this.rooms.push(room);
    }

    removeRoom = (roomId: string) => {
        this.rooms = this.rooms.filter(room => room.getRoomId() !== roomId);
    }

    getRoom = (roomId: string) => {
        const room = this.rooms.find(room => room.getRoomId() === roomId);
        if (room) {
            return room;
        }
        else {
            return null;
        }
    }

    getRooms = () => this.rooms;
}