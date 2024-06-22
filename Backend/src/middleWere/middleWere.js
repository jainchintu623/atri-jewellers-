const jwtProvider = require('../Config/jwtProvider')
const userService = require('../Services/UserService')
const authenticate = async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
    
        if (!token) {
            return res.status(404).send({ error: "Token not found." });
        }
    
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = userService.findUserById(userId);
        req.user = user;
    } catch (error) {
        
    
        return res.status(500).send({ error: "Internal server error." });
    }
    next();
}


module.exports = authenticate;