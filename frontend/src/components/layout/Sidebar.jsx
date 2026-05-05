 import { Link,useNavigate } from "react-router-dom";


 function Sidebar () {
       const navigate = useNavigate ();
     function logout () {
       localStorage.removeItem ('token');
        navigate ('/login');
     }


    return (
        <div>
            <h1>Admin Panel</h1>
       
             {/* NAV LINKS */}
              <nav>
                 <Link to={'/dashboard'}>Dashboard</Link>
                 <Link to={'/users'}>User</Link>
              </nav>
                <button onClick={logout}>Logout</button>
        </div>
    )
 }
 
 export default Sidebar;