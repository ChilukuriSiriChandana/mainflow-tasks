import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Cart from './components/Cart';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Error from './components/Error'; // Corrected import
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header';

const App = () => {
  return (
    <Provider store={store}>
      <Error>
        <Router>
          <Header/>
          <div className="container mt-4">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </Router>
      </Error>
    </Provider>
  );
};
export default App;
