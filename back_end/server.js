const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const itemsRoute = require('./routes/items');
const chatRoutes = require('./routes/chat');
const messageRoutes = require('./routes/message');
const locationRoutes = require('./routes/user_location');
const authRoutes = require('./routes/auth'); // Import auth routes
const userRoutes = require("./routes/Users");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple Route to Test
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoute);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/location', locationRoutes);
app.use("/api/Users", userRoutes);

// Start Server (Moved to the Bottom)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
