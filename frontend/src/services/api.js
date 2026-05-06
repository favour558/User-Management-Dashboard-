
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
 
    //   FUNCTION TO GET TOKEN
     function getToken () {
        return  localStorage.getItem ('token');
     }
     
        // LOGIN FUNCTION
   export async function loginUser (data) {
    try {
        const res = await fetch (`${BASE_URL}/auth/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify (data)
        })
            if (!res.ok) {
                throw new Error ('login failed')
            }
            return res.json ();
    }catch (err) {
         throw err;
    }
   }

    //  REGISTER USER
    export async function registerUser (data) {
      try {
        const response = await fetch (`${BASE_URL}/auth/register`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify (data)
        })
          if (!response.ok) {
            throw new Error ('Register failed')
          }
          return response.json ();
      }catch (error) {
        throw error
      }
    }

    //   GET ALL USERS
    export async function getAllUsers () {
        try {
            const user = await fetch (`${BASE_URL}/users`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${getToken()}`
                },
               
            });
            if (!user.ok) {
                throw new Error ('Failed to fetch users')
            }
            return user.json ();
        }catch (error) {
            throw error
        }
    }

    //  DELETE USER FUNCTION
    export async function deleteUser (id) {
        try {
         const user = await fetch (`${BASE_URL}/users/${id}`,{
            method: 'DELETE',
            headers: {
                 Authorization: `Bearer ${getToken()}`
            },
            
         })
          if (!user.ok) {
            throw new Error ('Failed to delete user')
          }
          return user.json ()
        }catch (error) {
            throw error
        }
    }

        // UPDATE USER FUNCTION

     export async function updateUser (id,updatedData) {
        try {
            const user = await fetch (`${BASE_URL}/users/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                      Authorization: `Bearer ${getToken()}`
                },
                 
                body: JSON.stringify (updatedData)
            })
             if (!user.ok) {
                throw new Error ('Failed to update user')
             }
             return user.json ();
        }catch (error) {
            throw error
        }
     }

    //  CREATING NEW USER
    export async function createUser (data) {
        try {
            const res = await fetch (`${BASE_URL}/users`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify (data)
            });
            if (!res.ok) {
                throw new Error (`Server failed: ${res.status}`)
            }
            return res.json ();
        }catch (error) {
            throw error
        }
    }