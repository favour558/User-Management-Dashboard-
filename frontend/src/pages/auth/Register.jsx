 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import {z} from 'zod'
 import { useState } from "react";
 import { registerUser } from "../../services/api";
 import { Link,useNavigate } from "react-router-dom";
   function Register () {
        // DEFINING STATE
        const [loading,setLoading] = useState (false);
        const [error,setError] = useState (null);
        const [message,setMessage] = useState ('');
        const [toggle,setToggle] = useState (false);

    //   DEFINING SCHMA
    const schema = z.object ({
        name: z.string ().min (3,'Name must be atleast 3 characters'),
        email: z.string ().email ('Email is required'),
        password: z.string ().min (6,'Password length must be atleast 6')
    });
    //   EXTRACTING REGISTERS
     const {register,handleSubmit,formState: {errors},reset} = useForm ({
        resolver: zodResolver (schema)
     });
        //  SUBMIT FUNCTION
         const navigate = useNavigate ();
        async function onSubmit (data) {
            setLoading (true);
          try {
            const responseData = await registerUser (data);
            if (responseData.success) {
               setMessage ('Register successful!');
               reset ();
                setTimeout (() => {
                    navigate ('/login')
                },1500)
            }else {
               setError ('Server failed: Failed to register user.') 
            }
          }catch (error) {
            setError (error.message)
          }finally {
            setLoading (false)
          }
        }


    return (
        <div className="bg-gray-100 min-h-screen flex justify-center align-items">
         <form className=" bg-white my-5 rounded shadow-md p-6 w-80" onSubmit={handleSubmit(onSubmit)}>
            {message && <p className="text-green-400">{message} </p>}
            {error && <p className="text-red-400 text-md">{error} </p>}
               <h1 className="font-bold text-lg text-center">Register</h1>
                {/* NAME INPUT */}
            <label className="font-bold">Name:</label>
            <input className="w-full border-2 border-green-200 rounded p-1 m-1" type="text" {...register ('name')} placeholder="Enter fullname"  />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message} </p>}

               {/* EMAIL INPUT */}
            <label className="font-bold">Email:</label>
            <input className="w-full border-2 border-green-300 rounded-sm p-1" type="email" {...register ('email')} placeholder="Enter email"  />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message} </p>}

              {/* NAME INPUT */}
            <label className="font-bold">Password:</label>
              <div className="flex gap-2">
            <input className="w-full p-1 rounded border-2 border-green-300" type= {toggle ? 'text': 'password'} {...register ('password')} placeholder="Enter password"  />
             <button className="text-lg text-blue-300" type="button" onClick={() => setToggle(!toggle)}>{toggle ? 'Hide': 'Show'} </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message} </p>}
              </div>
             <button className="w-full text-white p-1 rounded bg-green-500 my-3 hover:bg-blue-400 transition duration-500 ease-in" type="submit" disabled = {loading}>{loading ? 'Submitting...': 'Submit'} </button>
              
              <div>Already have an account? <Link className="text-green-400 text-lg" to={'/login'}>Login</Link> </div>
         </form>
           


        </div>
    )
   }
   export default Register;