import jwt from 'jsonwebtoken'


const isAuth = async (req,res,next) => {
    try {
        console.log('Auth middleware - checking token...');
        let {token} = req.cookies
        
        if(!token){
            console.error('No token found in cookies');
            return res.status(401).json({message:"Unauthorized: No token provided"})
        }
        
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET not found in environment variables');
            return res.status(500).json({message:"Server configuration error"});
        }
        
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

        if(!verifyToken){
            console.error('Invalid token');
            return res.status(401).json({message:"Unauthorized: Invalid token"})
        }
        
        if (!verifyToken.userId) {
            console.error('Token missing userId');
            return res.status(401).json({message:"Unauthorized: Invalid token payload"});
        }
        
        req.userId = verifyToken.userId
        console.log('User authenticated:', req.userId);
        next()

    } catch (error) {
         console.error("isAuth error:", error);
         if (!res.headersSent) {
            return res.status(401).json({message:`Authentication failed: ${error.message}`})
         }
    }
}

export default isAuth