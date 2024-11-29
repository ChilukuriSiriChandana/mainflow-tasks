const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Get cart items
router.get('/', async (req, res) => {
  const cartItems = await Cart.find();
  res.json(cartItems);
});

// Add item to cart
router.post('/', async (req, res) => {
  const newCartItem = new Cart(req.body);
  await newCartItem.save();
  res.status(201).json(newCartItem);
});

// Delete item from cart
router.delete('/:id', async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.send('Item deleted');
});

module.exports = router;
