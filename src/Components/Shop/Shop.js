import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

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

    const addEventHandler = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);

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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;