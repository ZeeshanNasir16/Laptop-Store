import * as actionTypes from '../constants/constants';
import { commerce } from '../../lib/commerce';

const fetchData = () => async (dispatch) => {
   try {
      dispatch({
         type: actionTypes.FETCH_REQUEST,
      });

      const { total_items, line_items, subtotal, id } =
         await commerce.cart.retrieve();

      dispatch({
         type: actionTypes.CART_FETCH_SUCCESS,
         payload: {
            totalItems: total_items,
            lineItems: line_items,
            subTotal: subtotal.raw,
            cart_id: id,
         },
      });

      const { data } = await commerce.products.list();

      dispatch({
         type: actionTypes.FETCH_PRODUCTS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      console.log(error);
      dispatch({
         type: actionTypes.FETCH_FAIL,
         payload: error,
      });
   }
};

export { fetchData };
