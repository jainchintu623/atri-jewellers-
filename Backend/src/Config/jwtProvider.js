const jwt = require("jsonwebtoken")

const SECRET_KEY= "ghuyfdt673663rfkuhyud7467468trfgku7uryuufjhjgt67tkhyugujh"

const genrateToken=(userId)=>{
    const token=jwt.sign({userId},SECRET_KEY,{expiresIn:"48h"})
    return token
}



const getUserIdFromToken = (token)=>{
 const decodedToken = jwt.verify(token,SECRET_KEY);
 return decodedToken.userId;
}

module.exports = {genrateToken,getUserIdFromToken}