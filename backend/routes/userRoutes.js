 const express = require ('express');
 const router = express.Router ();
 const User = require ('../model/User');
 const {protect,authorize} = require ('../middleware/authMiddleware');;
 
  
//    GET ALL USERS ROUTE
 router.get ('/',protect, async (req,res,next) => {
    try {
        const user = await User.find ();
        
        //   SENDING SUCCESS RESPONSE 
        res.status (200).json ({
            success: true,
            users: user
        })
    }catch (error) {
        next (error)
    }
 })

    // PATCH UPDATE FUNTION
    router.patch ('/:id',protect,authorize('admin','officer'), async (req,res,next) => {
        try {
            const id = req.params.id
            const updatedUser = await User.findByIdAndUpdate(
                id,
                req.body,
                {new: true}
            )
            if (!updatedUser) {
                return res.status (404).json ({
                    success: false,
                    message: 'User not found'
                })
            }
            res.status (200).json ({
                success: true,
                user: updatedUser
            })
        }catch (error) {
            next (error)
        }
    })

    //  DELETE USER
    router.delete ('/:id',protect,authorize('admin'), async(req,res,next) => {
        try  {
            const id = req.params.id;
            const deletedUser = await User.findByIdAndDelete (id);
            if (!deletedUser) {
                return res.status (404).json ({
                    success: false,
                    message: 'User not found'
                })
            }
             res.status (200).json ({
                success: true,
                message: 'User deleted successfully'
             })
        }catch (error) {
            next (error)
        }
    })

        //   POST ROUTES FOR NEW USER
        router.post ('/',protect,authorize('admin'),async (req,res,next) => {
            try {
                const {name,email,role} = req.body;
                //  CHECKING EMAIL
                const existingUser = await User.findOne ({email});
                if (existingUser) {
                    return res.status (400).json ({
                        success: false,
                        message: 'Email already exist'
                    })
                    
                }
                //  CREATING NEW USER
                const newUser = await User.create ({
                    name,
                    email,
                    role,
                    password: 'defaultPassword123'
                })
                //  SENDING RESPONSE
               res.status (201).json ({
                success: true,
                message: 'User created successfully',
                user: newUser
               }) 
            }catch (error) {
                next (error)
            }
        });

       

    module.exports = router