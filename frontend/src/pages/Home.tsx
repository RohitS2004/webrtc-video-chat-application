import { useNavigate } from "react-router-dom";
import Call from "../assets/Call";
import Join from "../assets/Join";
import { usePeer } from "../context/PeerContext";
import { useSocket } from "../context/SocketContext";
import { IRequest } from "../types/request";
import { useDispatch } from "react-redux";
import { setUserType } from "../features/RoomSlice";

const Home = () => {
    const { setStream, peer } = usePeer();
    const { ws } = useSocket();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleCreateCall = () => {
        // Access the media device, camera and microphone
        // Get the local media stream
        // Add the tracks to the peer connection
        // create an offer
        // set the local description
        // send the offer to the server
        dispatch(setUserType("host"));

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
                peer?.createOffer().then((offer) => {
                    peer?.setLocalDescription(offer).then(() => {
                        const request: IRequest = {
                            type: "create",
                            payload: {
                                offer: peer?.localDescription,
                            },
                        };
                        // send the offer to the server
                        ws?.send(JSON.stringify(request));
                    });
                });
            });
    };

    const handleJoinCall = () => {
        // navigate to the join page
        navigate("/join");
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex flex-col gap-2 items-center">
                <button
                    className="rounded-sm px-14 py-2 bg-amber-500 text-xl hover:opacity-30 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2"
                    onClick={handleCreateCall}
                >
                    <span>
                        <Call
                            width={24}
                            height={24}
                            strokeColor="#000"
                            strokeWidth={2}
                        />
                    </span>
                    <span>Create Call</span>
                </button>
                <button
                    className="rounded-sm px-14 py-2 bg-green-500 text-xl hover:opacity-30 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2 w-full"
                    onClick={handleJoinCall}
                >
                    <span>
                        <Join
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

export default Home;
