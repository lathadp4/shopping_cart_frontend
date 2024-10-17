import React, { useState } from 'react';
import './QuantitySelector.css';

const QuantitySelector = ({ initialQuantity = 1, maxQuantity = 10, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
            onQuantityChange(quantity + 1);
        }
    };

    return (
        <div className="quantity-selector">
            <button className="quantity-btn" onClick={handleDecrease} disabled={quantity <= 1}>-</button>
            <input
                type="text"
                className="quantity-input"
                value={quantity}
                readOnly
            />
            <button className="quantity-btn" onClick={handleIncrease} disabled={quantity >= maxQuantity}>+</button>
        </div>
    );
};

export default QuantitySelector;
