import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalPrice: 0 },
  reducers: {
    addToCart: (state, action) => {
        const { item } = action.payload;
        console.log('Item received in addToCart:', item);
       
        if (!item || !item.price || !item._id) {
          console.error("Invalid item data:", item);
          return;
        }
      
        if (isNaN(item.price) || item.price <= 0) {
          console.error("Invalid price:", item.price);
          return;
        }
        if (isNaN(item.quantity) || item.quantity <= 0) {
          console.error("Invalid quantity:", item.quantity);
          return;
        }

        const existingItem = state.items.find(cartItem => cartItem._id === item._id);
      
        if (existingItem) {
          existingItem.quantity += 1;  
        } else {
          state.items.push({ ...item, quantity: 1 }); 
        }
        state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
          
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(item => item._id === action.payload);
      if (index !== -1) 
      {
        state.items.splice(index, 1);
        state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },

    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find(item => item._id === _id);
      if (item) 
      { 
        item.quantity = quantity;
        state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
