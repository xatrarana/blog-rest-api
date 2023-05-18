const mongoose = require('mongoose');

// Define the post schema
const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

  // Create the Post model
const Post = mongoose.model('Post', postSchema);

// Export the models
module.exports = Post;
