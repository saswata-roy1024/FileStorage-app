import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import { store } from './Redux/Store/store'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(response => {
  console.log(response)  // handels axios respones and error response
  return response;
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
