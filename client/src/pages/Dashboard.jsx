import { Navigate } from "react-router-dom";

function Dashboard() {

  if (!window.localStorage.getItem("isAuthenticated")) return <Navigate to="/" />;
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard