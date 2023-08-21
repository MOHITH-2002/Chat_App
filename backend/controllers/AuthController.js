const User = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const { log } = require('console');

module.exports.register = async (req,res)=>{
    
    
        const error=[];
        const {userName, email, password,confirmPassword,image}=req.body;
    
        

        if(userName.length ===0){
            error.push({text: 'Please enter a username'});
            if(userName.length <5){
                error.push({text: 'username must be at least 5 characters'});
            }
    
        }
        
        // const checkemail= await User.findOne({email: email});
            if(!email){
                error.push({text: 'provide an Email Address'})
            }
            if(email && !validator.isEmail(email)){
                error.push({text: 'Please enter a valid email address'});
        }
        
        if(!password){
            error.push({text:"provide an password"});
        }
        if(password < 6){
            error.push({text: 'password must be at least 6 characters'});
        }
        if(password && confirmPassword && password !== confirmPassword){
            error.push({text:'confirm Password and password are not the same'});
        }
        
        
        if(error.length > 0){
            res.status(400).json({
                error:{
                    errorMessage : error
                }
            })
        } else{
    
        
 
        try {

            const checkEmail= await User.findOne({email: email});
            
            if(checkEmail){
            
                res.status(404).json( {error: {
                    errorMessage : ['Your email already exited']
                }});
            }else{
                // fs.copyFile(files.image.filepath,newPath,async (error)=>{
                    // if(!error){
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password,salt);

                            const userCreate = await User.create({
                                userName,
                                email,
                                password : hashedPassword,
                                image: image
                            });
    
                            const token = jwt.sign({
                                id : userCreate._id,
                                email: userCreate.email,
                                userName: userCreate.userName,
                                image: userCreate.image,
                                
                            }, process.env.SECRET_KEY,{
                                expiresIn: process.env.TOKEN_EXP
                            }); 
                        

                            
                       const options = { expires : new Date(Date.now() + process.env.COKKIEE_EXP * 24 * 60 * 60 * 1000 )}

                    res.status(201).cookie('authToken',token,options).json({
                                        success: 'Your Register Successful',token
                })
                        
                    


                
            }
        } catch (error) {
            res.status(500).json({error:{
                errorMessage:['internal server error']
            }});
        }  
        }
    // })
    

}
module.exports.login = async (req,res)=>{
    const error=[];
    const {email,password} = req.body;

    if(!email){
        error.push({text: 'please provide an Email Address'})
    }
    if(email && !validator.isEmail(email)){
        error.push({text: 'Please enter a valid email address'});
    }
    if(!password){
        error.push({text:"provide an password"});
    }
    if(password < 6){
        error.push({text: 'password must be at least 6 characters'});
    }
   
    if(error.length > 0){
        res.status(400).json({
            error:{
                errorMessage : error
            }
        })
    }else{

        try {
            const findUser= await User.findOne({email: email});
        
        if(findUser){

            const matchpassword = await bcrypt.compare(password,findUser.password);
            if(matchpassword){
                const token = jwt.sign({
                    id : findUser._id,
                    email: findUser.email,
                    userName: findUser.userName,
                    image: findUser.image,
                    
                }, process.env.SECRET_KEY,{
                    expiresIn: process.env.TOKEN_EXP
                }); 
                const options = { expires : new Date(Date.now() + process.env.COKKIEE_EXP * 24 * 60 * 60 * 1000 )}

                    res.status(200).cookie('authToken',token,options).json({success: 'Your Login Successful',token})

            }else{
                res.status(404).json({error:{
                    errorMessage:['Provide a valid password.']
                }});
            }
        }else{
            res.status(404).json({error:{
                errorMessage:['User is not registered.']
            }});
        }

        } catch (error) {
            res.status(500).json({error:{
                errorMessage:['Internal server error.']
            }});
        }
    }

}
module.exports.userLogout = async (req,res)=>{
    res.status(200).cookie('authToken','').json({success: true})

}