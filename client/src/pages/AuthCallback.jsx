import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();
  axios.get('/api/auth/isAuthenticated')
  .then(response => {
      if (response.status === 200) {
          window.localStorage.setItem("isAuthenticated", true)
          navigate('/dashboard')
      } else {
        navigate('/auth')
      }
  })
  .catch(error => {
      console.log(error.response);
        navigate('/auth')
  });


    return (
        <div>
          <h2>Authenticating...</h2>
        </div>
      );
}

export default AuthCallback