 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import {z} from 'zod'
 import { useState } from "react";
 import { loginUser } from "../../services/api";
 import { Link,useNavigate } from "react-router-dom";
   function Login () {
        // DEFINING STATE
        const [loading,setLoading] = useState (false);
        const [error,setError] = useState (null);
        const [message,setMessage] = useState ('');
        const [toggle,setToggle] = useState (false);

    //   DEFINING SCHMA
    const schema = z.object ({
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
            setLoading (true)
          try {
            const responseData = await loginUser(data)
            if (responseData.success) {
               setMessage ('Login successful!');
               reset ();
                localStorage.setItem ('token',responseData.token)
                setTimeout (() => {
                    navigate ('/dashboard')
                },1500)
            }else {
               setError ('Server failed: Failed to Login.') 
            }
          }catch (error) {
            setError (error.message)
          }finally {
            setLoading (false)
          }
        }


    return (
        <div className="min-h-screen flex justify-center align-center bg-gray">
         
         <form className="shadow-lg w-80 my-6 p-4 bg-black rounded-lg" onSubmit={handleSubmit(onSubmit)}>
            {message && <p className="text-green-500">{message} </p>}
            {error && <p className="text-red-500">{error} </p>}
                  <h1 className="font-bold text-center text-lg text-green-500">Login</h1>
               {/* EMAIL INPUT */}
            <label className="font-bold text-green-500">Email:</label>
            <input className="w-full border-2 border-green-400 rounded-md p-1 my-1" type="email" {...register ('email')} placeholder="Enter email"  />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message} </p>}

              {/* PASSWORD INPUT */}
            <label className="font-bold text-green-500">Password:</label>
             <div className="flex gap-2">
            <input className="w-full rounded-md border-2 border-green-400 p-1" type= {toggle ? 'text': 'password'} {...register ('password')} placeholder="Enter password"  />
             <button className="text-lg text-green-400" type="button" onClick={() => setToggle(!toggle)}>{toggle ? 'Hide': 'Show'} </button>
             </div>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message} </p>}
             <button className="w-full bg-green-800 text-white p-2 rounded-md my-4 hover:bg-green-200 transition duration-500 ease-in" type="submit" disabled = {loading}>{loading ? 'Loging...': 'Login'} </button>
              <div className="text-white">Don't have an account? <Link className="text-green-400" to={'/register'}>Register</Link> </div>
         </form>
           


        </div>
    )
   }
   export default Login;