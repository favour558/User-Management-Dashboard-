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
        app.use (cors ({
          origin: ['http://localhost: 5173','https://user-management-dashboard-beta-rosy.vercel.app'
          ],
          credentials: true
        }));
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

  