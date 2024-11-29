const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));



mongoose.connect('mongodb://localhost:27017/MainFlow_Task6')
  .then(() => console.log('Connected to MongoDB: MainFlow_Task6'))
  .catch(err => console.error('MongoDB connection error:', err));


const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

