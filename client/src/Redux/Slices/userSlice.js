import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    value: null,
    status: 'idle',
    error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await axios.get('http://localhost:8000/api/u/profile');
    return response.data;
});


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default userSlice.reducer;