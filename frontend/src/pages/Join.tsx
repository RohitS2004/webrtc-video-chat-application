import { useRef } from "react";
import JoinIcon from "../assets/Join";
import { usePeer } from "../context/PeerContext";
import { IRequest } from "../types/request";
import { useSocket } from "../context/SocketContext";
import Back from "../assets/Back";
import { useDispatch } from "react-redux";
import { setUserType } from "../features/RoomSlice";

const Join = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const { setStream, peer } = usePeer();
    const { ws } = useSocket();

    const handleJoinCall = () => {
        // access the media stream
        // add tracks to the peer connection
        // set the stream in the peer context
        // send a join request to the server with the room id

        // the server will send the remote offer in the response
        // set that remote offer as the remote description for this peer
        // then create an answer and set that as the local description
        // send that answer to the server
        // server will send the answer to the other peer
        // the other peer will set that as the remote description
        dispatch(setUserType("guest"));

        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: {
                    frameRate: {
                        ideal: 60,
                        max: 120,
                    },
                    facingMode: "user",
                },
            })
            .then((stream: MediaStream) => {
                setStream(stream);

                stream.getTracks().forEach((track) => {
                    peer?.addTrack(track, stream);
                });
            })
            .then(() => {
                const request: IRequest = {
                    type: "join",
                    payload: {
                        roomId: inputRef.current?.value,
                    },
                };

                ws?.send(JSON.stringify(request));
            });
    };

    const handleBack = () => {
        window.history.back();
        // navigates the browser back to the previous page in the session history
    };

    return (
        <div className="min-h-screen flex justify-center items-center relative">
            <div
                className="absolute top-4 left-4 p-2 bg-slate-900 rounded-full hover:bg-slate-600 active:scale-95 transition-all duration-200"
                onClick={handleBack}
            >
                <Back
                    width={26}
                    height={26}
                    strokeColor="#FFF"
                    strokeWidth={2}
                />
            </div>
            <div className="flex justify-center items-center gap-2 flex-col">
                <input
                    autoFocus
                    type="text"
                    placeholder="Enter room ID"
                    ref={inputRef}
                    className="py-2 rounded-sm bg-slate-100 outline-none text-xl px-2"
                />

                <button
                    className="rounded-sm px-14 py-2 bg-green-500 text-xl hover:opacity-30 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2 w-full"
                    onClick={handleJoinCall}
                >
                    <span>
                        <JoinIcon
                            width={24}
                            height={24}
                            strokeColor="#000"
                            strokeWidth={2}
                        />
                    </span>
                    <span>Join Call</span>
                </button>
            </div>
        </div>
    );
};

export default Join;
