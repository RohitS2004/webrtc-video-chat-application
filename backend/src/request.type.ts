export type RequestType = "create" | "ice-candidate" | "join" | "answer";
export interface RequestPayload {
    offer?: RTCSessionDescription | null,
    answer?: RTCSessionDescription | null,
    roomId?: string,
    iceCandidate?: RTCIceCandidate | null,
    message?: string
}

export interface IRequest {
    type: RequestType,
    payload: RequestPayload,
}