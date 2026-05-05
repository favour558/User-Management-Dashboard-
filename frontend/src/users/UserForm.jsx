 import { createUser } from "../services/api";
 import { updateUser } from "../services/api";
 import { useState,useEffect } from "react"
 import {z} from 'zod';
 import { zodResolver } from "@hookform/resolvers/zod";
 import { useForm } from "react-hook-form";
 function UserForm ({selectedUser,refresh}) {
    const  [loading,setLoading] = useState (false)
    //  DEFINING SCHEM
    const userSchema = z.object ({
        name: z.string ().min (3,'Name must be atleast 3 characters'),
        email: z.string ().email ('Email is required'),
        role: z.string ().nonempty ('Select your role')
    });
    //    DEFINING ZODRESOLVER
      const {register,handleSubmit,formState: {errors},reset} = useForm ({
        resolver: zodResolver (userSchema)
      });

        //  SUBMIT FUNCTION 
        async function onSubmit (data) {
            setLoading (true)
            try {
                if (selectedUser) {
                    await updateUser(selectedUser._id,data);
                    alert ('User updated successfully');
                    refresh();
                }else {
                    await createUser (data)
                    alert ('User created successfully');
                    refresh ();
                }
            }catch (error) {
                alert (error.message)
            }finally {
                setLoading (false)
            }
        }
     // USING USEEFFECT TO AUTO-REFILL
                useEffect (() => {
                  if (selectedUser) {
                    reset ({
                        name: selectedUser.name,
                        email: selectedUser.email,
                        role: selectedUser.role
                    })
                  }else {
                    reset ({
                        name: '',
                        email: '',
                        role: ''
                    })
                  }
                },[selectedUser])

    return (
        <div className="bg-black rounded-lg p-6 shadow-lg border border-green-900">
           <h2 className="font-bold text-green-500 text-lg mb-4">{selectedUser ? 'Updating User': 'Create New User'} </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
                  {/* NAME INPUT */}
             <label className="text-green-400 font-medium text-sm">Name:</label>
             <input  className="w-full border-2 border-green-900 bg-gray-950 text-white rounded-md p-2 mt-1 focus:outline-none focus:border-green-500" type="text" {...register('name')} placeholder="Enter fullname" />
               {errors.name && <p>{errors.name.message} </p>}

                  {/* EMAIL INPUT */}
             <label className="text-green-400 font-medium text-sm">Email:</label>
             <input className="w-full border-2 border-green-900 bg-gray-950 text-white rounded-md p-2 mt-1 focus:outline-none focus:border-green-500" type="email" {...register('email')} placeholder="Enter valid email" />
               {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message} </p>}

                  {/* ROLE INPUT */}
                  <label  className="text-green-400 font-medium text-sm">Role:</label>
                 <select  className="w-full border-2 border-green-900 bg-gray-950 text-white rounded-md p-2 mt-1 focus:outline-none focus:border-green-500" name="" id="" {...register ('role')}>
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                 </select>
                 {errors.role && <p>{errors.role.message} </p>}
                 <button type="submit" disabled={loading} >{loading ? 'Submitting..':selectedUser ? 'Updating user...': 'Creating user...'} </button>
          </form>
        </div>
    )
 }
 export default UserForm