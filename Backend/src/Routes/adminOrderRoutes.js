const express = require("express")
const router = express.Router();

const adminOrderControler = require('../Controler/adminOrderControler');
const authenticate = require("../middleWere/middleWere");

router.get('/',authenticate,adminOrderControler.getAllOrders)

router.put('/:orderId/confirmed',authenticate,adminOrderControler.confirmOrder)
router.put('/:orderId/ship',authenticate,adminOrderControler.shipOrder)
router.put('/:orderId/deliver',authenticate,adminOrderControler.deliverOrder)
router.put('/:orderId/cancle',authenticate,adminOrderControler.cancelOrder)
router.put('/:orderId/delete',authenticate,adminOrderControler.deleteOrder)

module.exports = router;