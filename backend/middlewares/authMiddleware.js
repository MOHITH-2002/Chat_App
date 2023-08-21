const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async (req,res,next)=>{////Callback argument to the middleware function, called "next" by convention.
    const {authToken} = req.cookies;
  
    if(authToken){
        const decodeToken = await jwt.verify(authToken,process.env.SECRET_KEY);
        req.Id = decodeToken.id;
        next();
    }else{
        res.status(401).json({error:{
            errorMessage: "Unauthorized Access"
        }})
    }
}