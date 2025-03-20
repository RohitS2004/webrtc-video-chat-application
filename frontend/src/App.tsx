import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { PeerProvider } from "./context/PeerContext";
import { SocketProvider } from "./context/SocketContext";

const App = () => {
    const [str, setStr] = useState<MediaStream | null>(null);
    const [peerConnection, setPeerConnection] =
        useState<RTCPeerConnection | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

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
            const data = JSON.parse(message.data);

            console.log(data);
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
