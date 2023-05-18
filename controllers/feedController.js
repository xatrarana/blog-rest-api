const Post = require('../models/post');

// Function to retrieve the user's customized feed
async function getCustomizedFeed(userId) {
    // Retrieve random posts from the database
    const randomPosts = await Post.aggregate([{ $sample: { size: 10 } }]);
  
    // Apply customization or filtering logic based on user preferences, interests, etc.
 
  
    // Return the customized feed
    return randomPosts;
  }

const feedController = async (req,res)=>{
    try {
        const userId = req.user;
        const userFeed = await getCustomizedFeed(userId);

        res.json({ success: true, feed: userFeed });
    } catch (e) {
        console.log(e);
        return res.status(500).json({error:error});
    }
}
module.exports = feedController;