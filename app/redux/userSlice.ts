import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        _id: "",
        name: "",
        email: "",
    },
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload);
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;