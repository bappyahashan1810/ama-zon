import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    const addEventHandler = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);

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
                <h1>Oder Summary</h1>
                <p>Selected Item: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;