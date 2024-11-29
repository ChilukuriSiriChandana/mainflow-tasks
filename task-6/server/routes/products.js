const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Add a new product dynamically
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price || !req.file) {
      return res.status(400).json({ error: 'Name, price, and image are required' });
    }

    const imagePath = `/images/${req.file.filename}`;
    const newProduct = new Product({ name, price, image: imagePath });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
});

module.exports = router;
