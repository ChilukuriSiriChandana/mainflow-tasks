import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) { // Confirmation dialog
      dispatch(removeFromCart(id));
    }
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  if (cart.items.length === 0) {
    return <div className="text-center mt-5">Your cart is empty</div>;
  }

  return (
    <div className="container">
      <h1>Cart</h1>
      <ul className="list-group">
        {cart.items.map(item => (
          <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {item.name} - ₹{item.price} x
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                min="1"
                className="form-control w-25 d-inline-block mx-2"
              />
            </div>
            <button onClick={() => handleRemove(item._id)} className="btn btn-danger btn-sm">Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ₹{cart.totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;

