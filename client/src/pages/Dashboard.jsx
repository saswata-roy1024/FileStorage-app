import { Navigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
function Dashboard() {
  if (!window.localStorage.getItem("isAuthenticated")) return <Navigate to="/" />;
  
  return (
    <div>
      <Sidebar />
    </div>
  )
}

export default Dashboard