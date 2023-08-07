import { getShoppingCart } from "../utilities/fakedb";

export const ProductsAndCartsLoader = async () => {
    const savedCart = getShoppingCart();
    const ids = Object.keys(savedCart);
    console.log(ids);




    const productData = await fetch('http://localhost:5000/productsById', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await productData.json();

    const previousCart = [];
    for (const id in savedCart) {
        const addedProducts = products.find(product => product._id === id);
        if (addedProducts) {
            const quantity = savedCart[id];
            addedProducts.quantity = quantity;
            previousCart.push(addedProducts);
        }
    }
    return { products: products, previousCart: previousCart };
}