import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {


    // pageination
    const { totalProducts } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    const totalPages = Math.ceil(totalProducts / itemsPerPage);


    const pageNumbers = [...Array(totalPages).keys()];








    const [products, setproducts] = useState([]);

    const [cart, setCart] = useState([]);


    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    // totalProdcut load
    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setproducts(data));
    }, [currentPage, itemsPerPage])


    useEffect(() => {
        const addedCart = getShoppingCart();
        const ids = Object.keys(addedCart);

        fetch('http://localhost:5000/productsById', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {

                const savedProduct = [];
                for (const id in addedCart) {

                    const addedProduct = cartProducts.find(product => product._id === id);
                    // console.log(addedProduct);
                    if (addedProduct) {
                        const quantity = addedCart[id];
                        addedProduct.quantity = quantity;
                        savedProduct.push(addedProduct);

                    }
                }
                setCart(savedProduct);


            })





    }, [products]);

    const addEventHandler = (selectedProduct) => {
        let newCart = [];
        const exits = cart.find(product => product._id === selectedProduct._id);
        if (!exits) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const restProduct = cart.filter(product => product._id !== selectedProduct._id);
            exits.quantity = exits.quantity + 1;
            newCart = [...restProduct, exits];
        }

        setCart(newCart);
        addToDb(selectedProduct._id);

    }

    const handleSelectChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(newItemsPerPage);
    };


    return (
        <>

            <div className='product-order-container'>
                <div className="product-container">
                    {
                        products.map(product => <Product
                            key={product._id}
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


            {/* pagination */}
            <p>page number {currentPage}</p><br />
            <div className='justify-center text-white flex my-[40px]'>

                {
                    pageNumbers.map(number => <button className={currentPage === number ? 'btn bg-orange-400' : 'mx-2'}
                        key={number}
                        onClick={() => setCurrentPage(number)}
                    >{number + 1}</button>)
                }


                <select id="itemsPerPage" value={itemsPerPage} onChange={handleSelectChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

        </>
    );
};

export default Shop;