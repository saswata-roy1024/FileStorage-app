import { Routes, Route, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';


function App() {
  let isAuthenticated = window.localStorage.getItem("isAuthenticated");
  
  return (
    <>
      <Routes>
        <Route index element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
