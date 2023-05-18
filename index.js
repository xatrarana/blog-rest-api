require('dotenv').config();
const express = require('express'); 
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const Connection = require('./db/connection');
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const verifyToken = require('./middlewares/authToken');
const route = require('./routes/indexRoute');
const feedRoute = require('./routes/feedRoute');
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.get('/', async (req,res)=>{
    try {
        res.json({sucess:true, message:"Sample rest api for the social."})
    } catch (e) {
        console.log(e);
        return res.json({message: "server error", error: e});
    }
})

//main user routes sign up and login => authentication
app.use('/api/e/user',userRouter);

//main post routes CRUD on post after the authorization
app.use('/api/e/posts',verifyToken, postRouter);

//search => authorization = true
app.use('/e/',verifyToken,route);

//feedRoute => authorization = true
app.use('/e/feed',verifyToken, feedRoute);

//starting server
const startServer = async () => {
    try {
        Connection();
        app.listen(PORT, ()=> console.log(`server is running at http://localhost:${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

startServer();