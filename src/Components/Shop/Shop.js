import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const products = useLoaderData();
    const [cart, setCart] = useState([]);

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }


    useEffect(() => {
        const addedCart = getShoppingCart();
        const savedProduct = [];
        for (const id in addedCart) {

            const addedProduct = products.find(product => product.id === id);
            // console.log(addedProduct);
            if (addedProduct) {
                const quantity = addedCart[id];
                addedProduct.quantity = quantity;
                savedProduct.push(addedProduct);

            }
        }
        setCart(savedProduct);

    }, [products]);

    const addEventHandler = (selectedProduct) => {
        let newCart = [];
        const exits = cart.find(product => product.id === selectedProduct.id);
        if (!exits) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const restProduct = cart.filter(product => product.id !== selectedProduct.id);
            exits.quantity = exits.quantity + 1;
            newCart = [...restProduct, exits];
        }

        setCart(newCart);
        addToDb(selectedProduct.id);

    }

    return (
        <div className='product-order-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        addEventHandler={addEventHandler}
                        product={product}
                    ></Product>)
                }
            </div>
            <div className="order-container">
                {
                    <Cart cart={cart}
                        clearCart={clearCart}
                    >
                        <Link to='/orders'>
                            <button className='bg-amber-600 w-full mt-6 p-2 rounded-md items-center text-white'>Review Order <FontAwesomeIcon className='ml-3' icon={faDirections}></FontAwesomeIcon>
                            </button>
                        </Link>

                    </Cart>

                }
            </div>
        </div>
    );
};

export default Shop;