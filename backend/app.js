require("dotenv").config();
const express=require('express');
const app=express();
app.use(express.json());
const mongoose=require('mongoose');
async function connect(){
    try {
        
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected");
    } catch (error) {
        return res.stauts(500).send({status:"fail",message:error.message});
    }   
}
connect();
const userRouter=require('./routes/userRouter');
const authRouter=require('./routes/authRouter');
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);

app.get('/',(req,res)=>{
    res.send('Hello World');
});
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});