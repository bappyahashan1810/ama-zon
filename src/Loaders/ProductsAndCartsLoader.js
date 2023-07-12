import { getShoppingCart } from "../utilities/fakedb";

export const ProductsAndCartsLoader = async () => {
    const productData = await fetch('products.json');
    const products = await productData.json();
    const savedCart = getShoppingCart();
    const previousCart = [];
    for (const id in savedCart) {
        const addedProducts = products.find(product => product.id === id);
        if (addedProducts) {
            const quantity = savedCart[id];
            addedProducts.quantity = quantity;
            previousCart.push(addedProducts);
        }
    }
    return { products: products, previousCart: previousCart };
}