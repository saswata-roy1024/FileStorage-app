import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import App from './App.jsx'
import './index.css'

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(response => {
  console.log(response)  // handels axios respones and error response
  return response;
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
