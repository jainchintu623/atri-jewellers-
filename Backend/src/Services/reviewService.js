const Review = require("../Models/reviewModel");

const productService = require("../Services/productService");

async function createReview(reqData,user){
    const product = await productService.findProductById(reqData.productId);
  
    const review = new Review({
        user:user._id,
        product:product._id,
        review:reqData.review,
        createAt:new Date()
    })
    

    await product.save();
    return await review.save();
}


async function getAllReviws(reqData)
{
  
    const product = await productService.findProductById(reqData.productId);
    console.log(product)
    return await Review.find({product}.populate("user"))
}

module.exports = {createReview,getAllReviws}