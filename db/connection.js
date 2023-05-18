require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection options
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
};

// Database connection URI
const dbURI = process.env.MONGODB_URL;

const connection = () => {
    // Establish the database connection
    mongoose.connect(dbURI, dbOptions)
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    });

    // Handle the connection events
    mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
    });
};

// Gracefully handle process termination
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed due to application termination');
    process.exit(0);
  });
});

module.exports = connection;