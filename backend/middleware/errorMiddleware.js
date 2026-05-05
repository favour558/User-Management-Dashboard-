
//   TUTOR THIS IS THE errorMiddleware FILE
  function errorHandler (err,req,res,next) {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode
   res.status (statusCode).json ({
      success: false,
      message: err.message|| 'Server Error'
   })
 }
 module.exports = errorHandler