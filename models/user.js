const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^(\+\d{1,3}[- ]?)?\d{10}$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
});



// Create the User model
const User = mongoose.model('User', userSchema);



// Export the models
module.exports =  User;
