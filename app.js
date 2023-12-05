const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express();

// Edit profile
const profileRoutes = require('./routes/profileRoutes');

app.use('/profile', profileRoutes);

// Load the environment variables from .env file
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Mongo DB is connected');
}).catch(err => {
  console.error('Mongo DB connection error:', err);
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.userId; // Attach user ID to the request object
    next();
  });
}

// Example of a protected route
app.get('/protected', verifyToken, (req, res) => {
  // You can access req.userId here, which contains the user's ID
  res.json({ message: 'Access granted' });
});

// Define routes for sign-up and sign-in
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
