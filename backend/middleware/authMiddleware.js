 const jwt = require ('jsonwebtoken');
 const User = require ('../model/User')
  
//  MIDDLEWARE FUNCTION
  async function protect (req,res,next) {
    let token;
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split (' ')[1]
    }
    if (!token) {
        return res.status (401).json ({
            success: false,
            message: 'Unauthorized: Token missing'
        })
    }
    try {
        const decoded = jwt.verify (token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select ('-password');
        if (!user) {
            return res.status (401).json ({
                success: false,
                message: 'User not found'
            })
        }
        req.user = user
        next ()
    }catch (error) {
        next (error)
    }
  }
 
    //  FUNCTION ROLE BASE ACCESS
     function authorize (...roles) {
        return function (req,res,next) {
            if (!roles.includes(req.user.role)) {
                return res.status (403).json ({
                    success: false,
                    message: 'Access denied: Admins only'
                })
            }
            next ()
        }
     }


  module.exports ={protect,authorize}