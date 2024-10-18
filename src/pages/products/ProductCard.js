import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import { productData } from '../../service/Product';
import { addCartData } from '../../service/Cart';
import { useNavigate } from 'react-router';

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productData();
                setProducts(response?.data || []);
            } catch (err) {
                setError("An error occurred while fetching products.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = async (item) => {
        try {
            const response = await addCartData(item);
            if (response?.status === true) {
                navigate("/cart");
            }
        } catch (err) {
            setError("An error occurred while adding item to cart.");
        }
    };

    if (loading) return <div className="loader">Loading products...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="product-page">
            <div className="header">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-arrow-left"
                    cursor="pointer"
                    onClick={() => navigate('/')}
                >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <h1>Product Details</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shopping-cart-icon"
                    onClick={() => navigate("/cart")}
                >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </div>

            <div className="product-card-container">
                {products.length > 0 ? (
                    products.map((item) => (
                        <div key={item?.id} className="card">
                            <div className="card-image">
                                <img src={item?.image} alt={item?.title} />
                            </div>
                            <div className="card-details">
                                <h2 className="product-name">{item?.title}</h2>
                                <p className="product-description">{item?.description}</p>
                                <p className="product-price">
                                    ${item?.price}
                                    <div className="rating-display">
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index} className={`star ${index < item?.rating ? 'filled' : 'empty'}`}>
                                                ★
                                            </span>
                                        ))}
                                        <span className="rating-text">({item?.rating})</span>
                                    </div>
                                </p>
                                {item?.stock == 0 ? "" : <button className="buy-now" onClick={() => handleAddToCart(item)} >
                                    Add to Cart
                                </button>}

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-products">No products available</div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
