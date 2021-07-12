import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from './store/actions/fetchActions';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify-redux';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/HomePage';
import Cart from './Pages/Cart/Cart';
import NotFound from './Pages/404/Error_404';
import Checkout from './Pages/CheckOut/Checkout';
import './App.css';
import { commerce } from './lib/commerce';

function App() {
   const dispatch = useDispatch();
   const [order, setOrder] = useState({});
   const [error, setErrorMessage] = useState('');

   useEffect(() => {
      dispatch(fetchData());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleCaptureOrder = async (checkoutTokenId, newOrder) => {
      console.log(newOrder);
      try {
         const incomingOrder = await commerce.checkout.capture(
            checkoutTokenId,
            newOrder
         );
         setOrder(incomingOrder);
      } catch (error) {
         setErrorMessage(error.data.error.message);
      }
   };

   return (
      <div className='app'>
         {/* // ? NavBar */}
         <NavBar />

         {/* // ? Pages */}
         <main>
            <Switch>
               <Route exact path='/' component={Home} />
               <Route exact path='/cart' component={Cart} />
               <Route exact path='/checkout'>
                  <Checkout
                     handleCaptureOrder={handleCaptureOrder}
                     order={order}
                     error={error}
                  />
               </Route>

               <Route path='*' component={NotFound} />
            </Switch>
         </main>

         {/* // ? Footer */}

         <Footer />
         <ToastContainer position='top-left' />
      </div>
   );
}
export default App;
