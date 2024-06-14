import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AuthCallback from './pages/AuthCallback';
import SharedFile from './pages/SharedFile';

function App() {
  let isAuthenticated = window.localStorage.getItem("isAuthenticated");
  
  return (
    <>
      <Routes>
        <Route index element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/:id/share" element={<SharedFile />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
