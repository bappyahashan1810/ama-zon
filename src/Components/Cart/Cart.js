import React from 'react';
import './Cart.css'
const Cart = ({ cart }) => {
    // const { props } = props;




    const totalQuantity = cart.reduce((previous, current) => previous + current.quantity, 0);
    const total = cart.reduce((previous, current) => previous + current.price * current.quantity, 0);
    const shipping = cart.reduce((previous, current) => previous + current.shipping, 0);
    const tex = (total * 0.1).toFixed(2);
    const grand = total + shipping + +tex;
    // let totalQuantity = 0;
    // let total = 0;
    // let shipping = 0;
    // for (const product in cart) {
    //     console.log(product);
    //     totalQuantity = totalQuantity + product['quantity'];

    //     total = total + product.price;
    //     shipping = shipping + product.shipping;

    // }
    // const tex = (total * 0.1).toFixed(2);
    // const grand = total + shipping + +tex;
    return (
        <div className='props-container'>
            <h5 className='props-name'>Oder Summary</h5>
            <p>Selected Item: {totalQuantity}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping: ${shipping}</p>
            <p>Tex: ${tex}</p>
            <h6>Grand Total: ${grand}</h6>
        </div>
    );
};

export default Cart;