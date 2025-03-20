import { createContext, useContext } from "react";

interface ISocketContext {
    ws: WebSocket | null;
    setWs: (ws: WebSocket) => void;
}

const SocketContext = createContext<ISocketContext>({
    ws: null,
    setWs: () => {},
})

export const SocketProvider = SocketContext.Provider;

export const useSocket = () => {
    return useContext(SocketContext);
}