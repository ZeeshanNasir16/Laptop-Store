import * as actionTypes from '../constants/productConstants';

const initialState = {
   products: [],
   loading: true,
};

const getProductsReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.FETCH_REQUEST:
         return {
            loading: true,
            products: [],
         };

      case actionTypes.FETCH_PRODUCTS_SUCCESS:
         return {
            loading: false,
            products: action.payload,
         };

      case actionTypes.FETCH_FAIL:
         return {
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

export { getProductsReducer };
