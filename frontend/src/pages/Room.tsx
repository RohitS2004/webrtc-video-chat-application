import { useEffect, useRef } from "react";
import { usePeer } from "../context/PeerContext";
import { useSocket } from "../context/SocketContext";
import { IRequest } from "../types/request";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Room = () => {
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);

    const userType: "host" | "guest" = useSelector((state: any) => state.room.userType);

    const { peer, stream } = usePeer();
    const { ws } = useSocket();

    const url = useLocation().pathname;
    const roomId = url.split("/")[2];

    useEffect(() => {
        localVideoRef.current!.srcObject = stream;

        peer!.ontrack = (e) => {
            console.log("track received!!");
            remoteVideoRef.current!.srcObject = e.streams[0];
        };

        peer!.onconnectionstatechange = () => {
            console.log(peer?.connectionState);
        };

        // gather the ice candidates and send them to the server which will send them to the other peer
        peer!.onicecandidate = (event) => {
            if (event.candidate) {
                // console.log(event.candidate);

                const request: IRequest = {
                    type: "ice-candidate",
                    payload: {
                        iceCandidate: event.candidate,
                        roomId: roomId,
                    },
                };

                ws?.send(JSON.stringify(request));
            }
        };
        
    }, []);

    return (
        <div className="min-h-screen flex items-center gap-5 px-5">
            <div 
            className="flex flex-col gap-5 items-center text-white"
            >
                <video
                    ref={localVideoRef}
                    autoPlay
                    className="-scale-x-100 flex-1 aspect-auto"
                ></video>
                <h1>(Local Stream)</h1>
            </div>

            <div
            className="flex flex-col gap-5 items-center text-white"
            >
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    className="-scale-x-100 flex-1 aspect-auto"
                ></video>
                <h1>(Remote Stream)</h1>
            </div>
        </div>
    );
};

export default Room;
