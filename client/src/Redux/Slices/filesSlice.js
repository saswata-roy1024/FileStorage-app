import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  files: [],
  status: 'idle',
  error: null,
};

export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  const response = await axios.get('/api/files/all');
  return response.data;
});

export const uploadFile = createAsyncThunk('files/uploadFile', async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('/api/files/upload', formData);
  console.log(response.data);
  return response.data;
});

export const toggleStarFile = createAsyncThunk('files/toggleStarFile', async (fileId) => {
  const response = await axios.post(`/api/files/${fileId}/toggleStar`);
  return response.data;
});

export const deleteFile = createAsyncThunk('files/deleteFile', async (fileId) => {
  const response = await axios.post(`/api/files/${fileId}/delete`);
  return response.data;
});



const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.files.push(action.payload);
      })
      .addCase(toggleStarFile.fulfilled, (state, action) => {
        const index = state.files.findIndex(file => file._id === action.payload._id);
        if (index !== -1) {
          state.files[index].starred = action.payload.starred;
        }
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        const index = state.files.findIndex(file => file._id === action.payload._id);
        if (index !== -1) {
          state.files[index].deletedAt = action.payload.deletedAt;
        }
      })
  },
});

export default filesSlice.reducer;