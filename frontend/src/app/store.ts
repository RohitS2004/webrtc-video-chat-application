import { configureStore } from "@reduxjs/toolkit";
import RoomReducer from "../features/RoomSlice";

export const store = configureStore({
    reducer:{
        room: RoomReducer
    }
})