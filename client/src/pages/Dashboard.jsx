import { Navigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import MainContainer from "@/components/MainContainer";
function Dashboard() {
  if (!window.localStorage.getItem("isAuthenticated")) return <Navigate to="/" />;

  return (
    <div className='h-screen flex'>
      <Sidebar />
      <MainContainer />
    </div>
  )
}

export default Dashboard