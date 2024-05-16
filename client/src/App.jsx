import Landing from './pages/Landing';
import Auth from './pages/Auth'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
