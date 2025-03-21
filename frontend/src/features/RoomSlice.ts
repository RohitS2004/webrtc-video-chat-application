import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    roomId: string | null,
    userCount: number,
    userType: "host" | "guest"
}

const initialState: IInitialState = {
    roomId: null,
    userCount: 0,
    userType: "host"
}

export const RoomSlice = createSlice({
    initialState,
    name: "room",
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload;
        },
        setUserCount: (state, action) => {
            state.userCount = action.payload
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        }
    }
})

export const { setRoomId, setUserCount, setUserType } = RoomSlice.actions;
export default RoomSlice.reducer;
