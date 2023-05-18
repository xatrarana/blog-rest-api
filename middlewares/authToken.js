const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    const token = authHeader && authHeader.split(' ')[1];
    try {
        if(token == null) return res.status(401).json({sucess:false, message:"token is required"});
        jwt.verify(token, process.env.SECRETE_KEY,(err,usr)=>{
            if(err) return res.status(401).json({sucess:false, message:"token is not valid"});
            req.user = usr;
            next();
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({sucess:false, message:"server error",error});
    }
   

    
}

module.exports = verifyToken;