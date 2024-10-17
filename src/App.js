import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import ProductCard from './pages/products/ProductCard';
import Cart from './pages/carts/Cart';
import { useState, useEffect } from 'react';

function App() {
  // Initialize loginsuccess from localStorage
  const [loginsuccess, setLoginsuccess] = useState(() => {
    return localStorage.getItem('loginsuccess') === 'true';
  });

  // Update localStorage whenever loginsuccess changes
  useEffect(() => {
    localStorage.setItem('loginsuccess', loginsuccess);
  }, [loginsuccess]);

  return (
    <div className="App">
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage setLoginsuccess={setLoginsuccess} />} />

        {/* Protected Routes */}
        {loginsuccess ? (
          <>
            <Route path="/product" element={<ProductCard />} />
            <Route path="/cart" element={<Cart />} />
          </>
        ) : (
          // Redirect to the login page if not logged in
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
