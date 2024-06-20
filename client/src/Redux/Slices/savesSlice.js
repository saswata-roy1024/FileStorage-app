import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

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

export const removeSaves = createAsyncThunk('saves/removeSaves', async (id, { rejectWithValue }) => {
    try {
        await axios.delete('/api/files/remove', { data: { id } });
        return { id };
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
            })
            .addCase(removeSaves.fulfilled, (state, action) => {
                state.saves = state.saves.filter(file => file._id !== action.payload.id);
                toast.success('Saved file removed successfully!', { position: 'top-center' });
            })
            .addCase(removeSaves.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
                toast.error('Some Error Occurred!', { position: 'top-center' });
            });
    },
});

export default savesSlice.reducer;
