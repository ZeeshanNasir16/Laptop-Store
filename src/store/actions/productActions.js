import * as actionTypes from '../constants/productConstants';
import { commerce } from '../../lib/commerce';

const fetchProducts = () => async (dispatch) => {
   try {
      dispatch({
         type: actionTypes.FETCH_REQUEST,
      });

      const { data } = await commerce.products.list();

      dispatch({
         type: actionTypes.GET_PRODUCTS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      console.log(error);
      dispatch({
         type: actionTypes.GET_PRODUCTS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export { fetchProducts };
