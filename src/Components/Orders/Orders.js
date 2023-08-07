import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const { products, previousCart } = useLoaderData();
    const [cart, setCart] = useState(previousCart);
    const handleRemoveItem = (id) => {
        const remainingCart = cart.filter(product => product._id !== id);
        setCart(remainingCart);
        removeFromDb(id);
    }
    return (
        <div className='product-order-container' >
            <div className="orders-container">
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        handleRemoveItem={handleRemoveItem}
                        product={product}
                    ></ReviewItem>)
                }
                {
                    cart.length === 0 && <h4><span className='text-center'>Please go to Shop Page <Link to='/'><span className='text-blue-600 font-bold'>Shop Now!</span></Link></span></h4>
                }
            </div>
            <div className="order-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;