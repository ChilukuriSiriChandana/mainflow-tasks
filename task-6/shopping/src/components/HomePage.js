import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../store/cartSlice';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false); 
      })
      .catch(err => {
        console.error(err);
        setLoading(false); 
      });
  }, []);

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity: 1 }; 
    const existingProduct = cart.items.find(item => item._id === product._id);
  
    if (existingProduct) {
      dispatch(updateQuantity({ _id: product._id, quantity: existingProduct.quantity + 1 }));
    } else {
      dispatch(addToCart({ item: productWithQuantity })); 
    }
  };
  
  if (loading) {
    return <div className="text-center mt-5">Loading products...</div>; 
  }

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product._id}>
            <div className="card">
              <img src={`http://localhost:5000${product.image}`} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">₹{product.price}</p>
                <button onClick={() => handleAddToCart(product)} className="btn btn-primary" to='/cart'>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
