 import Register from "./pages/auth/Register";
 import Login from "./pages/auth/Login";
 import ProtectedRoute from "./ProtectedRoute";
  import Dashboard from "./dashboard/Dashboard";
  import { Routes,Route,Navigate } from "react-router-dom";
function App() {

  return (
    <>
       <Routes>
         <Route path="/" element = {<Navigate to={'/register'} replace />} />
         <Route path="/register" element = {<Register />} />
         <Route path="/login" element = {<Login />} />
         <Route path="/dashboard" element = {
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          } />
        </Routes>  
     
    </>
  )
}

export default App
