const CartItem = require("../Models/CartItemModel");
const userService = require("../Services/UserService");

async function updateCartitem(userId, cartItemId, cartItemData) {
  try {
    const item = await findCartItemById(cartItemId);
   
    if (!item) {
    
      throw new Error("cart item not Found :", cartItemId);
    }
    const user = await userService.findUserById(item.userId);

    if (!user) {
      throw new Error("user not Found : ", userId);
    }

    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("you cant update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if (user._id === cartItem.userId) {
        
      return await CartItem.findByIdAndDelete(cartItemId);
    }
  
    throw new Error("You can't remove another user's item");
  }
  

async function findCartItemById(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId).populate('product');;
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cartItem not Found with Id", cartItemId)
  }
}

module.exports = { updateCartitem, removeCartItem, findCartItemById };
