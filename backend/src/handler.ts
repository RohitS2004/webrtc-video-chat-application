import { WebSocket } from "ws";
import { RequestPayload } from "./request.type";
import { generateRandomId } from "./utility";
import { User } from "./user";
import { Room } from "./room";
import { IResponse } from "./response.type";
import { manager } from ".";

export const handleCreateRoom = (socket: WebSocket, payload: RequestPayload) => {
    // we will receive the offer in the payload
    // set the offer to the remote offer in the room which we will create
    // create a new user
    // generate a new room id
    // create a new room 
    // add the user to the room
    // add the offer to the remoteOffer in the room
    // send the room id back to the user
    // send a success message also
    
    const offer = payload.offer;
    const roomId = generateRandomId();
    const user = new User(socket, roomId);
    const room = new Room(roomId, offer!, [user], 2, null, 1);
    

    // Room created successfully
    console.log("Room created successfully!", room.getRoomId(), " 💚");
    manager.addRoom(room);

    const response: IResponse = {
        type: "room-id",
        payload: {
            roomId: roomId,
        }
    }


    socket.send(JSON.stringify(response));
}

export const handleJoinRoom = (socket: WebSocket, payload: RequestPayload) => {
    // we will receive the room id in the payload
    // find the room with the given room id
    // if not exists send an error message
    // if exists create a new user
    // add the user to the room
    // send the remote offer to the user who joined the room
    
    const roomId = payload.roomId;
    const room = manager.getRoom(roomId!);

    if (!room) {
        const response: IResponse = {
            type: "error",
            payload: {
                message: "Room not found"
            }
        }

        socket.send(JSON.stringify(response));
        return;
    }

    const user = new User(socket, roomId!);
    room.addUser(user);

    const remoteOffer = room.getRemoteOffer();
    
    const response: IResponse = {
        type: "offer",
        payload: {
            offer: remoteOffer!,
            roomId: roomId,
        }
    }

    room.updateCount();
    socket.send(JSON.stringify(response));
}

export const handleAnswer = (socket: WebSocket, payload: RequestPayload) => {
    // we will receive the answer in the payload
    // set that answer to the room's remote answer 
    // send this answer to the other user in the room
    
    const answer = payload.answer;    
    const roomId = payload.roomId;

    const room = manager.getRoom(roomId!);
    room?.setRemoteAnswer(answer!);

    const users = room?.getUsers();
    const otherUser = users?.find(u => u.getSocket() !== socket);

    const response: IResponse = {
        type: "answer",
        payload: {
            answer: answer!,
        }
    }

    otherUser?.getSocket().send(JSON.stringify(response));
}

export const handleIceCandidate = (socket: WebSocket, payload: RequestPayload) => {
    // we will recieve a single ice candidate 
    // we will also receive a room id
    // get the room from the room id
    // send this ice candidate to the other user in the room

    const roomId = payload.roomId;
    const room = manager.getRoom(roomId!);
    const iceCandidate = payload.iceCandidate;

    const users = room?.getUsers();
    const otherUser = users?.find(u => u.getSocket() !== socket);

    // send the ice candidate 
    const response: IResponse = {
        type: "ice-candidate",
        payload: {
            iceCandidate: iceCandidate!,
        }
    }

    otherUser?.getSocket().send(JSON.stringify(response));
}