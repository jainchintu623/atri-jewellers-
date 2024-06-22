const userService=require("../Services/UserService")
const jwtProvider = require("../Config/jwtProvider");
const bcrypt =require("bcrypt");
const cartService = require('../Services/cartService')

const register = async(req,res)=>{

    try{
      const user=  await userService.createUser(req.body);
      const jwt = jwtProvider.genrateToken(user._id);
      
     await cartService.createCart(user)


     return res.status(200).send({jwt,message:"Register Success"})

    }catch(error){
      
    return res.status(500).send({error:error.message});
  
    } 

}



const login = async(req,res)=>{
    const {Password,Email}=req.body;
    try{

  const user = await userService.getUserByEmail(Email);

  if(!user){
    return res.status(404).send({message:"user Not Found With Email",Email})


  }

   const isPasswordValid = await bcrypt.compare(Password,user.Password) 
  
   if(!isPasswordValid)
     {
        return res.status(401).send({message:"Invlid Password..."})
     }

     const jwt = jwtProvider.genrateToken(user._id);
     return res.status(200).send({jwt,message:"Login Success"})

    }catch(error){

        return res.status(500).send({error:error.message});
    } 
}

module.exports = {register,login}