import React from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cart = ({ cart, clearCart }) => {
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
            <button className='bg-rose-600 rounded-md p-2 mt-10  items-center w-full text-white' onClick={clearCart}>
                Clear Cart  <FontAwesomeIcon className='ml-3' icon={faTrashCan}></FontAwesomeIcon></button><br /><br />
            <Link to='/orders'>
                <button className='bg-amber-600 w-full mt-6 p-2 rounded-md items-center text-white'>Review Order <FontAwesomeIcon className='ml-3' icon={faDirections}></FontAwesomeIcon>
                </button>
            </Link>
        </div>
    );
};

export default Cart;