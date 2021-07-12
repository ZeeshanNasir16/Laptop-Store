import * as actionTypes from '../constants/constants';
import { commerce } from '../../lib/commerce';
import { success, error, info } from 'react-toastify-redux';

const addToCart = (pid) => async (dispatch, getState) => {
   try {
      const { lineItems } = getState().cart;
      let item_exists;

      if (lineItems.length !== 0) {
         item_exists = lineItems.find(
            (item) => item.product_id === pid
         );
      }

      if (item_exists) {
         dispatch(info('Item already exists in Cart'));
      } else {
         dispatch(info('Adding To Cart'));
         await commerce.cart.add(pid).then(({ cart }) => {
            dispatch(success('Item added to cart'));
            const { line_items, total_items, subtotal, id } = cart;
            console.log('Adding ', id);
            dispatch({
               type: actionTypes.CART_UPDATE_SUCCESS,
               payload: {
                  totalItems: total_items,
                  lineItems: line_items,
                  subTotal: subtotal.raw,
               },
            });
         });
      }
   } catch (er) {
      dispatch(error(er));

      dispatch({
         type: actionTypes.CART_UPDATE_FAIL,
         payload: er,
      });
   }
};

const removeFromCart = (iId) => async (dispatch) => {
   try {
      dispatch(info('Removing from Cart'));
      await commerce.cart.remove(iId).then(({ cart }) => {
         dispatch(success('Item removed from cart'));
         const { line_items, total_items, subtotal } = cart;
         dispatch({
            type: actionTypes.CART_UPDATE_SUCCESS,
            payload: {
               totalItems: total_items,
               lineItems: line_items,
               subTotal: subtotal.raw,
            },
         });
      });
   } catch (er) {
      dispatch(error(er));
      dispatch({
         type: actionTypes.CART_UPDATE_FAIL,
         payload: er,
      });
   }
};

const updateCart = (iId, quantity) => async (dispatch) => {
   try {
      await commerce.cart
         .update(iId, { quantity })
         .then((response) => {
            const { line_items, total_items, subtotal } =
               response.cart;
            dispatch({
               type: actionTypes.CART_UPDATE_SUCCESS,
               payload: {
                  totalItems: total_items,
                  lineItems: line_items,
                  subTotal: subtotal.raw,
               },
            });
         });
   } catch (er) {
      dispatch(error(er));
      dispatch({
         type: actionTypes.CART_UPDATE_FAIL,
         payload: er,
      });
   }
};

export { addToCart, removeFromCart, updateCart };
