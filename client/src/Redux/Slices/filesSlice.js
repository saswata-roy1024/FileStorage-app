import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  files: [],
  status: 'idle',
  error: null,
};

export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  const response = await axios.get('http://localhost:8000/api/files/all');
  console.log("FetchFiles:" + response.data);
  return response.data;
});

export const uploadFile = createAsyncThunk('files/uploadFile', async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('http://localhost:8000/api/files/upload', formData);
  console.log(response.data);
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
        console.log(action.payload);
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.files.push(action.payload);
      })
  },
});

export default filesSlice.reducer;