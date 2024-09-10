import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    value: null,
    status: 'idle',
    error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await axios.get('/api/u/profile');
    return response.data;
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ name, email }, { rejectWithValue }) => {
    try {
        const response = await axios.put('/api/u/profile', { name, email });
        toast.success('User updated successfully');
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            console.log('Validation errors:', error.response.data.errors);
            error.response.data.errors.forEach((err) => toast.error(err.msg, { duration: 5000, position: 'top-center' }));
            return rejectWithValue(error.response.data.errors);
        } else {
            console.log('An error occurred:', error.message);
            toast.error('An error occurred. Please try again.', { duration: 5000, position: 'top-center' });
            return rejectWithValue(error.message);
        }
    }
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
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default userSlice.reducer;
