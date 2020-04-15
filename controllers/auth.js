const Users =require('../models/users');
const jwt =require('jsonwebtoken');
const expressJwt=require('express-jwt');
const {errorHandler}=require('../helpers/dbErrorHandler')

exports.signup=(req,res)=>{
    const user = new Users(req.body);
    user.save((err,user)=>{
        
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt =undefined;
        user.hashed_password=undefined;
        res.json({
            user
        })
    })
}

exports.signin =(req,res)=>{
    // find the user based on Email
    const {email, password}=req.body;
    Users.findOne({email},(err, user)=>{
        if(err || !user){
            return res.status(400).json({
                err:"User with that EmailId does not exist. Please Signup"
            })
        }
        // if User is found make sure the email and password match
        // create authenticate user
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and Password dont match"
            })
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
        res.cookie("t", token,{expire: new Date()+9999});
        // return the response to frontend client
        const {_id,name,email,role}=user;
        return res.json({token,user:{_id,name,email,role}})
    })
}

exports.signout =(req,res)=>{
        res.clearCookie('t')
        res.json({message:"SignOut Sucessfully"})
}

exports.requireSignin=expressJwt({
    secret:process.env.JWT_SECRET,
    userProperty:"auth"
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};


