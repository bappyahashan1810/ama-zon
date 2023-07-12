import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const { products, previousCart } = useLoaderData();
    const [cart, setCart] = useState(previousCart);
    const handleRemoveItem = (id) => {
        const remainingCart = cart.filter(product => product.id !== id);
        setCart(remainingCart);
        removeFromDb(id);
    }
    return (
        <div className='product-order-container' >
            <div className="orders-container">
                {
                    cart.map(product => <ReviewItem
                        key={product.id}
                        handleRemoveItem={handleRemoveItem}
                        product={product}
                    ></ReviewItem>)
                }
            </div>
            <div className="order-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;