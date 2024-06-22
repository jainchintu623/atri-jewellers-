const express = require("express")
const router = express.Router();

const ratingControler = require('../Controler/ratingControler');
const authenticate = require("../middleWere/middleWere");


router.post('/create',authenticate,ratingControler.createRating);
router.get('/product/:productId',authenticate,ratingControler.getAllRating);


module.exports = router;