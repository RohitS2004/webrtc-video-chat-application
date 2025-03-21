import { useEffect, useRef } from "react";
import { usePeer } from "../context/PeerContext";
import { useSocket } from "../context/SocketContext";
import { IRequest } from "../types/request";

const Room = () => {

    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);

    const { peer, stream } = usePeer();
    const { ws } = useSocket();

    useEffect(() => {

        localVideoRef.current!.srcObject = stream;

        peer!.ontrack = (e) => {
            remoteVideoRef.current!.srcObject = e.streams[0];
        }

        // gather the ice candidates and send them to the server which will send them to the other peer
        peer!.onicecandidate = (event) => {
            if (event.candidate) {
                console.log(event.candidate);

                const request: IRequest = {
                    type: "ice-candidate",
                    payload: {
                        iceCandidate: event.candidate
                    }
                }

                ws?.send(JSON.stringify(request));
            }
        }

    }, [])

    return (
        <div>
            <video
            ref={localVideoRef}
            autoPlay
            className="-scale-x-100"
            >
            </video>
            <video
            ref={remoteVideoRef}
            autoPlay
            className="-scale-x-100"
            >    
            </video>
        </div>
    )
}

export default Room;