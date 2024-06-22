const express = require("express")
const router = express.Router();

const reviewControler = require('../Controler/reviewControler');
const authenticate = require("../middleWere/middleWere");


router.post('/',authenticate,reviewControler.createReview);
router.get('/product/:productId',authenticate,reviewControler.getAllReviws);


module.exports = router;