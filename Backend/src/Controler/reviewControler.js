const reviewService = require('../Services/reviewService')

const createReview = async(req,res)=>{
    const user =req.user;
    try{

      const review = await reviewService.createReview(req.body,user);
      return res.status(201).send(review)


    }catch(error)
    {
       return res.status(500).send({error:error.message})
    }
}



const getAllReviws = async(req,res)=>{
    const productId = req.params.productId;
    try{

      const reviews = await reviewService.getAllReviws(productId);
      return res.status(201).send(reviews)


    }catch(error)
    {
       return res.status(500).send({error:error.message})
    }
}

module.exports = {createReview,getAllReviws}