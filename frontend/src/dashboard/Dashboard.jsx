 import { useState,useEffect } from "react"
  import { getAllUsers } from "../services/api"
 import UserForm from "../users/UserForm"
  import UserTable from "../users/UserTable"
  function Dashboard () {
   // DECLARING STATES
    const [loading,setLoading] = useState (false)
     const [error,setError] = useState (null)
      const[users,setUsers] = useState ([]);
      const [selectedUser,setSelectedUser] = useState (null);

      //   FETCH USER FUNCTION 
      async function fetchUsers () {
          setLoading (true);
          setError (null);
          setUsers ([]);
         try {
            const userData = await getAllUsers ();
            setUsers (userData.users);
         }catch (error) {
            setError (error.message)
         }finally {
            setLoading (false)
         }
      }
            //  USING USEEFFECT TO CALL FETCHUSERS
            useEffect (() => {
               fetchUsers ()
            },[]);

         // SELECTED USER FUNCTION 
         function handleEdit (user) {
            setSelectedUser (user)
         }
            // REFRESH USER FUNCTION 
            function onRefresh () {
               fetchUsers ();
               setSelectedUser (null)
            }
   return (
      <div>
          {<UserTable users={users} error = {error} loading={loading} onEdit={handleEdit} refresh = {onRefresh} />}
          {<UserForm  selectedUser={selectedUser} refresh={onRefresh} />}
      </div>
   )
  }
 export default Dashboard