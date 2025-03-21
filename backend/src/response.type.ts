export type ResponseType = "room-id" | "answer" | "offer" | "ice-candidate" | "error";
export interface ResponsePayload {
    roomId?: string,
    answer?: RTCSessionDescription,
    offer?: RTCSessionDescription,
    iceCandidate?: RTCIceCandidate,
    message?: string,
}

export interface IResponse {
    type: ResponseType,
    payload: ResponsePayload
}