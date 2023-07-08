import React from 'react';
import './Cart.css'
const Cart = (props) => {
    return (
        <div>
            <h5 className='cart-name'>Oder Summary</h5>
            <p>Selected Item: {props.cart.length}</p>
        </div>
    );
};

export default Cart;