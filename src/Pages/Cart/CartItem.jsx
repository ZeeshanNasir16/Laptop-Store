import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import styles from './CartItemStyles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
   removeFromCart,
   updateCart,
} from '../../store/actions/cartActions';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
function ShoppingCartItem(props) {
   const { classes } = props;
   const { pImage, pName, iId, pPrice, pTPrice, pQuantity } = props;
   const dispatch = useDispatch();
   const [quantity, setquantity] = useState(pQuantity);
   const [price, setPrice] = useState(pTPrice);

   const increaseQuantity = () => {
      dispatch(updateCart(iId, quantity + 1));
      setquantity(quantity + 1);
      setPrice(price + pPrice);
   };
   const decreaseQuantity = () => {
      dispatch(updateCart(iId, quantity - 1));
      setquantity(quantity - 1);
      setPrice(price - pPrice);
   };

   return (
      <div className={classes.item}>
         <div
            className={`${classes.buttons} textaligncenter`}
            onClick={() => dispatch(removeFromCart(iId))}
         >
            <RemoveShoppingCartIcon />
         </div>

         <div className={classes.image}>
            <img src={pImage} alt={pName} />
         </div>

         <div className={classes.description}>
            <span>{pName}</span>
         </div>

         <div className={`${classes.quantity} textaligncenter`}>
            <button
               name='increase'
               className={classes.quantityBtn}
               onClick={increaseQuantity}
               disabled={quantity === 3}
            >
               <AddIcon fontSize='small' />
            </button>
            <span className={classes.quantityNo}>{quantity}</span>
            <button
               className={classes.quantityBtn}
               onClick={decreaseQuantity}
               disabled={quantity === 1}
            >
               <RemoveIcon fontSize='small' />
            </button>
         </div>

         <div className={`${classes.totalPrice}`}>{`$${price}`}</div>
      </div>
   );
}

export default withStyles(styles)(ShoppingCartItem);
