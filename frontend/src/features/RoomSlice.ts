import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    roomId: string | null,
    userCount: number,
}

const initialState: IInitialState = {
    roomId: null,
    userCount: 0,
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
        }
    }
})

export const { setRoomId, setUserCount } = RoomSlice.actions;
export default RoomSlice.reducer;
