import React, { useState, useEffect } from 'react';
import './Cart.css';
import QuantitySelector from './QuantitySelector';
import { getCartData, removeAllCartData, removeCartData, updateCartData } from '../../service/Cart';
import { useNavigate } from 'react-router-dom';

const Cart = ({ }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await getCartData();
            setCartItems(response?.data || []);
        } catch (err) {
            setError(err.message || "An error occurred while fetching cart items.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleQuantityChange = async (newQuantity, id) => {
        try {
            await updateCartData({ product_quantity: newQuantity, id });
            fetchProducts(); // Refresh cart items after updating quantity
        } catch (err) {
            setError(err.message || "Failed to update quantity.");
        }
    };

    const onRemoveItem = async (id) => {
        try {
            await removeCartData(id);
            fetchProducts(); // Refresh cart items after removal
        } catch (err) {
            setError(err.message || "Failed to remove item.");
        }
    };

    const onRemoveAllItems = async () => {
        try {
            await removeAllCartData();
            fetchProducts(); // Refresh cart after removing all items
        } catch (err) {
            setError(err.message || "Failed to remove all items.");
        }
    };

    if (loading) return <div>Loading cart items...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="cart-page">
            <div className="cart-header">
                {cartItems?.length > 0 && (
                    <button className="back-button" onClick={() => navigate('/product')}>
                        Back to Products
                    </button>
                )}
                <h1 className="cart-title">My Cart</h1>
                {cartItems?.length > 0 && (
                    <button onClick={onRemoveAllItems} className="remove-all-button">Clear Cart</button>
                )}
            </div>

            {cartItems.length === 0 ? (
                <div className="empty-cart-container">
                    <p className="empty-cart">Cart is empty!</p>
                    <button onClick={() => navigate("/product")} className="back-to-product-button">
                        Back to Products
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-grid">
                        {cartItems.map(item => (
                            <div className="cart-item" key={item?.id}>
                                <img src={item?.product_image} alt={item?.product_title} className="item-image" />
                                <div className="item-details">
                                    <h2 className="item-title">{item?.product_title}</h2>
                                    <p className="item-price">${item?.product_price}</p>
                                    <QuantitySelector
                                        initialQuantity={item?.product_quantity}
                                        maxQuantity={10}
                                        onQuantityChange={(newQuantity) => handleQuantityChange(newQuantity, item?.id)}
                                    />
                                    <button onClick={() => onRemoveItem(item?.id)} className="remove-button">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Total: ${cartItems.reduce((total, item) => total + item.product_price * item.product_quantity, 0).toFixed(2)}</h2>
                        <button className="checkout-button">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>

    );
};

export default Cart;
