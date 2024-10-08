import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import { store, persistor } from './Redux/Store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import './index.css'

axios.defaults.baseURL = "https://filestorage-xq97.onrender.com";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  response => {
    console.log('Axios Response:', response);
    return response;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
)
