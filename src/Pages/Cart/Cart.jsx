import React from 'react';
import { withStyles } from '@material-ui/core';
import { commerce } from '../../lib/commerce';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CartStyles';
import CartItem from './CartItem';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import empCart from '../../empty-cart.png';
import { success, info } from 'react-toastify-redux';

function ShoppingCart(props) {
   const { classes } = props;
   let err = false;
   const { loading, totalItems, lineItems, subTotal, error } =
      useSelector((state) => state.cart);

   const dispatch = useDispatch();

   if (!loading && error != null) {
      err = true;
   }

   const handleEmptyCart = async () => {
      try {
         dispatch(info('Clearing the cart'));
         commerce.cart.empty().then((response) => {
            if (response.success) {
               dispatch(success('Cart cleared'));
               dispatch({ type: 'CART_RESET' });
            }
         });
      } catch (er) {
         alert('Error :', er);
      }
   };

   if (loading)
      return (
         <div className={classes.root}>
            <Loading />;
         </div>
      );
   else if (err) return <Redirect to='/' />;
   else if (totalItems != null && totalItems !== 0) {
      return (
         <>
            <div className={classes.shoppingCart}>
               <h2>Shopping Cart</h2>
               {lineItems.map((item) => (
                  <CartItem
                     key={item.product_id}
                     iId={item.id}
                     pName={item.name}
                     pImage={item.media.source}
                     pPrice={item.price.raw}
                     pTPrice={item.line_total.raw}
                     pQuantity={item.quantity}
                     pId={item.product_id}
                  />
               ))}

               <span className={classes.totalPrice}>
                  Subtotal : {` $${subTotal}`}
               </span>
            </div>

            <div className={classes.cartBtnContainer}>
               <Button
                  className={classes.cartBtn}
                  component={Link}
                  to='/'
               >
                  Continue Shopping
               </Button>
               <Button
                  className={classes.cartBtn}
                  onClick={handleEmptyCart}
               >
                  Clear Cart
               </Button>
               <Button
                  component={Link}
                  to='/checkout'
                  className={classes.cartBtn}
               >
                  Checkout
               </Button>
            </div>
         </>
      );
   } else {
      return (
         <div className={classes.empContainer}>
            <div>
               <img
                  src={empCart}
                  alt='Empty cart'
                  width='400px'
                  height='200px'
               />
            </div>
            <Link className={classes.cartBtn} to='/'>
               Continue Shopping
            </Link>
         </div>
      );
   }
}

export default withStyles(styles)(ShoppingCart);
