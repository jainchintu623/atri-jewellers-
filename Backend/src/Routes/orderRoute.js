const express = require("express")

const router = express.Router();
const orderControler = require('../Controler/orderControler')
const authenticate = require('../middleWere/middleWere');


router.post('/',authenticate,orderControler.createOrder);
router.get('/user',authenticate,orderControler.orderHistory);
router.post('/:id',authenticate,orderControler.findOrderById);

module.exports = router ;