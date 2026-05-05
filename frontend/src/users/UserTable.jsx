
import { deleteUser } from "../services/api";

 function UserTable ({
    users,
    loading,
    error,
    refresh,
    onEdit
 }) {
       
     async function onDelete (id) {
        const confirmDelete = window.confirm ('Are you sure you want to delete this user?');
         if (!confirmDelete) return
        try {
          await deleteUser (id);
          refresh()
          alert ('User deleted successfully')
        }catch (error) {
           alert (error.message)
        }
     }

     if (loading) {
        return <p>Loading users...</p>
     }
     if (error) {
        return <p>{error} </p>
     }

    return (
        <div className="bg-black rounded-lg shadow-lg border border-green-900 overflow-hidden">
            {/* TABLE HEADER */}
             <div className="p-4 border-b border-green-900">
               <h2 className="text-green-500 font-bold text-lg">All Users</h2>
             </div>
              <div className="overflow-x-auto">
          <table className="w-full">
             <thead className="bg-gray-950">
                <tr>
                    <th className="text-left text-green-400 p-4 font-medium">Name</th>
                    <th  className="text-left text-green-400 p-4 font-medium">Email</th>
                     <th  className="text-left text-green-400 p-4 font-medium">Role</th>
                     <th  className="text-left text-green-400 p-4 font-medium">Edit</th>
                      <th  className="text-left text-green-400 p-4 font-medium">Actions</th>
                </tr>
             </thead>

                <tbody>
                    {users.map (user => (
                        <tr key={user._id}>
                           <td className="text-white p-4">{user.name} </td> 
                           <td>{user.email} </td>
                           <td className="text-gray-400 p-4">{user.role} </td>
                           <td className="bg-green-800 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300 text-sm"><button onClick={() => onEdit(user)}>Edit</button> </td>
                           <td className="bg-red-900 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300 text-sm"><button onClick={() => onDelete(user._id)}>Delete</button> </td>
                        </tr>
                    ))}
                </tbody>
            
          </table>

      </div>

        </div>
    )
 }
 export default UserTable