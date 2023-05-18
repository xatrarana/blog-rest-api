const Post = require('../models/post');
const User = require('../models/user');
//return the post of the user
const Posts = async (req,res) => {
    const id = req.params.id;
    let user = await User.findById(id).populate("posts");
    try {
        if(!user) return res.status(403).json({sucess:false, message:"no user found"});
        const posts = user.posts;
        return res.json({success:true, posts:posts});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message:"server error",error:e});
    }
}
const CreatePost = async (req,res) => {
    let {user,title,desc,like} = req.body;
    title = title.trim();
    desc = desc.trim();

    try{
        if (!title) return res.status(400).json({ success: false, message: "Title is required." });
      
          const post = new Post({
            title,
            description:desc,
            user,
          });
          
          const result = await post.save();
          const userData = await User.findOneAndUpdate(
            { _id: user },
            { $push: { posts: post._id } }, // Save the post ID in the user's posts array
            { new: true }
          );

          if(!result || !userData) return res.json({ success: false, message: "error in post creation." });
          return res.json({ success: true, message: "Post created successfully." });
    } catch (e) {
        console.log(e);
        return res.status(500).json({message:"server error",error:e});
    }
}

const deletePost = async(req,res)=>{
    const id = req.params.id;
    const user = req.body.user;
    
    try {
        const post = await Post.findByIdAndDelete(id);
        if(!post) return res.status(403).json({sucess:false, message:"no post found"});

        const userdata = await User.findByIdAndUpdate(
            {_id:user},
            {$pull: {posts : post.id}}
            );

        if(!userdata) return res.status(403).json({sucess:false, message:"error in post delete."});
        return res.json({sucess:true, message:"post deleted sucessfully."})
    } catch (e) {
        console.log(e);
        return res.status(500).json({error:"server error"});
    }
};
const updatepost = async(req,res)=>{
    const postId = req.params.id; 
    const { title, description } = req.body;
  
    try {
      
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, description },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ success: false, message: "Post not found." });
      }
  
      return res.json({ success: true, post: updatedPost });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Server error", error });
    }
};
module.exports = {Posts, CreatePost,deletePost,updatepost}