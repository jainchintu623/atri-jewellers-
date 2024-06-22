const CartItem = require("../Models/CartItemModel");
const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel");

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createCart = await cart.save();
    
    return createCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart({ userId }) {
  try {
    let cart = await Cart.findOne({ userId });

    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;

    cart.discounte = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
   
    throw new Error(error.message);
  }
}

async function addCartItem({userId}, req) {
    
  try {
    const cart = await Cart.findOne({userId });
    
    const product = await Product.findById(req.productId);
    
    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });
    

    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
        discountePrice: product.discountePrice,
      });

      const createdCartItem = await cartItem.save();

      cart.cartItems.push(createdCartItem);
      
      await cart.save();
      console.log(cart)
      return "item Added To Cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createCart, findUserCart, addCartItem };
