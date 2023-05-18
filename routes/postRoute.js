const express = require('express');
const { CreatePost, Posts, updatepost, deletePost } = require('../controllers/postController');
const postRouter = express.Router();

postRouter.get('/:id',Posts);
postRouter.post('/create',CreatePost);
postRouter.put('/update/u/:id',updatepost);  // takes the post id in paramerter and user id in body
postRouter.delete('/delete/u/:id',deletePost); // takes the post id in paramerter and user id in body

module.exports = postRouter;