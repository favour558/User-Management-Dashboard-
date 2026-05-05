   require ('dotenv').config ();
 const express = require ('express')
   const cors = require ('cors');
  const connectDB = require ('./db');
  const authRoutes = require ('./routes/auth');
  const userRoutes = require ('./routes/userRoutes');
  const errorHandler = require ('./middleware/errorMiddleware');
    // MOUNTING ROUTES
  const app = express ();
  const PORT = process.env.PORT || 8000;

    //  CONNECT DATABASE
    connectDB ();
     
        // MIDDLEWARE
        app.use (cors ());
        app.use (express.json());

        //  ROUTES
        app.use ('/auth',authRoutes);
        app.use ('/users',userRoutes)

        //  ERROR HANDLER
        app.use (errorHandler);
    // LISTENING SERVER

     app.listen (PORT,() => {
      console.log (`Server running on port ${PORT}`)
     });

  