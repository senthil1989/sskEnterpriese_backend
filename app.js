const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser= require('body-parser');
const cookieParser=require('cookie-parser');
const expressValidator=require('express-validator');
const authRouter=require('./routes/auth')
const userRouter=require('./routes/user')
const categoryRouter=require('./routes/category')
const productRouter=require('./routes/product')

//db
const mongoose=require('mongoose')
//app
const app =express();
//db
mongoose.set('useNewUrlParser', true);
const mongoosePromises=mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useCreateIndex:true
})
// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//route middleware
app.use('/api',authRouter);
app.use('/api',userRouter);
app.use('/api',categoryRouter);
app.use('/api',productRouter);
mongoosePromises.then(()=>console.log("DB Connected"))


const port =process.env.PORT || 8000
app.listen(port, ()=>{
    console.log(`Server is Running on ${port}`)
});