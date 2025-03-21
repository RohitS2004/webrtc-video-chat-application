import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PeerProvider } from "./context/PeerContext";
import { SocketProvider } from "./context/SocketContext";
import { setUserCount, setRoomId } from "./features/RoomSlice";
import { useDispatch } from "react-redux";
import { IResponse } from "./types/response";
import { IRequest } from "./types/request";

const App = () => {
    const [str, setStr] = useState<MediaStream | null>(null);
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setStream = (stream: MediaStream) => {
        setStr(stream);
    };

    const setPeer = (peer: RTCPeerConnection) => {
        setPeerConnection(peer);
    };

    const setWs = (ws: WebSocket) => {
        setSocket(ws);
    };

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setWs(ws);

        const pc = new RTCPeerConnection({
            iceServers: [], // no STUN/TURN servers required when testing locally
        });

        ws.onmessage = (message) => {
            const data: IResponse = JSON.parse(message.data);

            switch (data.type) {
                case "room-id": {
                    dispatch(setRoomId(data.payload.roomId));
                    dispatch(setUserCount(1));
                    
                    navigate(`/room/${data.payload.roomId}`);
                    break;
                }

                
                case "answer": {
                    // we will receive the remote answer
                    // set the answer to the remote description

                    const remoteAnswer = data.payload.answer;
                    if (!pc.remoteDescription) {
                        pc.setRemoteDescription(remoteAnswer!);
                    }
                    break;
                }

                case "offer": {
                    // console.log(data);

                    const remoteOffer = data.payload.offer;

                    // console.log(remoteOffer);
                    pc.setRemoteDescription(remoteOffer!);

                    pc.createAnswer()
                    .then((answer) => {
                        pc.setLocalDescription(answer);
                    })
                    .then(() => {
                        const request: IRequest = {
                            type: "answer",
                            payload: {
                                answer: pc.localDescription,
                                roomId: data.payload.roomId
                            }
                        }

                        ws.send(JSON.stringify(request));

                        dispatch(setUserCount(2));

                        navigate(`/room/${data.payload.roomId}`);
                    })

                    break;
                }
            }
        }

        setPeer(pc);
    }, []);

    return (
        <SocketProvider value={{ ws: socket, setWs: setWs }}>
            <PeerProvider
                value={{
                    peer: peerConnection,
                    stream: str,
                    setPeer: setPeer,
                    setStream: setStream,
                }}
            >
                <div className="max-w-full min-h-screen bg-slate-950">
                    <main className="min-h-screen">
                        <Outlet></Outlet>
                    </main>
                </div>
            </PeerProvider>
        </SocketProvider>
    );
};

export default App;
