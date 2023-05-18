const express = require('express');


const { Signup, Login } = require('../controllers/userController');
const userRouter = express.Router();



//rotues
userRouter.get('/', async(req,res)=>{
    try {
        return res.json({sucess:true, message:"user route page"})
    } catch (e) {
        return res.json({message:"Server error", error:e})
    }
});

userRouter.post('/auth/signup',Signup);
userRouter.post('/auth/login',Login);



module.exports = userRouter;