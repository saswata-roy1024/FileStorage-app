import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    saves: [],
    status: 'idle',
    error: null,
};

export const fetchSaves = createAsyncThunk('saves/fetchSaves', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/files/saves');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const savesSlice = createSlice({
    name: 'saves',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSaves.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSaves.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.saves = action.payload;
            })
            .addCase(fetchSaves.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default savesSlice.reducer;
