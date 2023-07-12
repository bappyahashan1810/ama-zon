
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Inventory from './Components/Inventory/Inventory'
import Shop from './Components/Shop/Shop';
import About from './Components/About/About'
import Orders from './Components/Orders/Orders';
import { ProductsAndCartsLoader } from './Loaders/ProductsAndCartsLoader';



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        {
          path: '/',
          loader: async () => fetch('products.json'),
          element: <Shop></Shop>
        },
        {
          path: '/orders',
          loader: ProductsAndCartsLoader,
          element: <Orders></Orders>
        },
        {
          path: 'inventory',
          element: <Inventory></Inventory>
        },
        {
          path: 'about',
          element: <About></About>
        }
      ]
    }
  ]);
  return (
    <div >
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
