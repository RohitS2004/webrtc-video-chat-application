import { createContext, useContext } from "react";

interface IPeerContext {
    peer: RTCPeerConnection | null;
    stream: MediaStream | null;
    setPeer: (peer: RTCPeerConnection) => void;
    setStream: (stream: MediaStream) => void;
}

const PeerContext = createContext<IPeerContext>({
    peer: null,
    stream: null,
    setPeer: () => {},
    setStream: () => {},
})

export const PeerProvider = PeerContext.Provider;

export const usePeer = () => {
    return useContext(PeerContext);
}