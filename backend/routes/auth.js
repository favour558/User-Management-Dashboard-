 const express = require ('express');
 const router = express.Router ();
 const jwt = require ('jsonwebtoken');
 const bcrypt = require ('bcryptjs');
 const {z} = require ('zod');
 const User = require ('../model/User')

//    REGISTER ROUTES
 
router.post ('/register',async (req,res,next) => {
     const schema = z.object ({
        name: z.string ().min (3,'Name must be atleast 3 characters'),
        email: z.string ().email ('Email is required'),
        password: z.string ().min (6,'Password length should be atleast 6 letters')
     });
          const check = schema.safeParse (req.body);
           if (!check.success) {
            return res.status (400).json ({
                 success: false,
                 message: check.error.errors[0].message
            })
           }
     try {
        const {name,email,password} = check.data
         const existingUser = await User.findOne ({email});
          if (existingUser) {
            return res.status (400).json ({
                success: false,
                message: 'Email already exist: Please enter new Email'
            })
          }


               //   HASHING PASSWORD
          const saltRounds = 10;
          const hashPassword = await bcrypt.hash (password,saltRounds);

            // COUNT EXISTING USERS
            const userCount = await User.countDocuments();
            const role = userCount === 0 ? 'admin':'user'
            //  CREATING NEW USER
            const newUser = await User.create ({
                name,
                email,
                password:hashPassword,
                role
            })

           

            // SENDING RESPONSE MESSAGE
            res.status (201).json ({
                success: true,
                message: 'User Register successfully',
                user: {
                    id: newUser._id,
                   name: newUser.name,
                   email: newUser.email
                }
            })
     }catch (error) {
        next (error)
     }
});

//   POST ROUTES
 router.post ('/login',async (req,res,next) => {
     try {
        const {email,password} = req.body
        const user = await User.findOne ({email});
         if (!user) {
            return res.status (404).json ({
                success: false,
                message: 'Email not found'
            })
         }
            // VERIFY PASSWORD MATCH
            const isMatch = await bcrypt.compare (password,user.password);
            if (!isMatch) {
                return res.status (401).json ({
                    success: false,
                    message:  'Invalid password: Password not match'
                })
            }
            //  GENERATING TOKEN
            const token = jwt.sign (
                {id: user._id},
                process.env.JWT_SECRET,
                {expiresIn: '1d'}
            )

            //   SENDING RESPONSE
            res.status  (200).json ({
                success: true,
                message: 'Login successfully!',
                token: token,
                user: {
                    id: user._id,
                     email: user.email
                }
            })
     }catch (error) {
        next (error)
     }
 });

 module.exports = router;