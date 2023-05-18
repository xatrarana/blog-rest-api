const Post = require('../models/post');
const searchPosts = async (searchTerm) => {
    try {
      // Create a regular expression for case-insensitive search
      const regex = new RegExp(searchTerm, 'i');
  
      // Search for posts matching the title or content fields
      const foundPosts = await Post.find({
        $or: [
          { title: regex },
          { content: regex }
        ]
      });
  
      return foundPosts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
const Search = async (req,res)=>{
    const searchKey = req.query.q; 
    try {
        const foundPosts = await searchPosts(searchKey);
        if(!foundPosts) return res.json({sucess:false, message:"Post not found"});
    res.json({ success: true, posts: foundPosts });
    } catch (e) {
        console.log(e);
        return res.status(500).json({error:"server error",e});
    }
}

module.exports = Search;