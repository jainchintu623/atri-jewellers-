const Address = require("../Models/addressModel");
const OrderItem = require("../Models/orderItems");
const Order = require("../Models/orderModel");
const cartService = require("../Services/cartService");

async function createOrder(user, shippAddress) {
  let address;


  if (shippAddress._id) {
    let ExistAddress = await Address.findById(shippAddress._id);
    
    address = ExistAddress;
  } else {
    address = Address(shippAddress);
    address.user = user;
    await address.save();

    user.Address.push(address);
    await user.save();
   
  }


  const cart = await cartService.findUserCart(user._id);
 
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem ({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountPrice: item.discountPrice,

    });
    

    const craetedOrderItem = await orderItem.save();
    orderItems.push(craetedOrderItem);
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice:cart.totalPrice,
    totalDiscountPrice: cart.totalDiscountPrice,
    discounte: cart.discounte,
    totalItem: cart.totalItem,
    shippAddress: address,
  
  });
  

  const savedOrder = await createdOrder.save();
  return savedOrder;
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
}

async function confirmOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELEVERED";

  return await order.save();
}

async function cancelOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";

  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findbyId(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
}

async function userOrderHistory(orderId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};
