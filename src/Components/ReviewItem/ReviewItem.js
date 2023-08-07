import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const ReviewItem = ({ product, handleRemoveItem }) => {
    const { name, img, price, quantity, _id } = product;
    return (
        <div className='reviewItem-container flex m-5 border border-blue-500 w-2/3 mt-10 place-items-center'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='flex justify-between m-3 place-items-center w-full'>
                <div className='w-5/6'>
                    <p className='font-bold'>{name}</p>
                    <p><small className='font-medium'>Price: ${price}</small></p>
                    <p><small className='font-medium'>Quantity: {quantity}</small></p>
                </div>
                <div className='w-1/6'>
                    <button onClick={() => handleRemoveItem(_id)} className='w-9 rounded-full h-9 hover:bg-violet-600 bg-red-500'>
                        <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;