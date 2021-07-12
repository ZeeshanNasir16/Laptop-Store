import * as actionTypes from '../constants/constants';

const initialState = {
   cart: [],
   products: [],
};

const fetchReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.GET_DATA_REQUEST:
         console.log('fetching');
         return {
            loading: true,
            ...state,
         };

      case actionTypes.GET_DATA_SUCCESS:
         return {
            loading: false,
            ...action.payload,
         };

      case actionTypes.GET_DATA_FAIL:
         return {
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.CART_UPDATE_REQUEST:
         console.log('Cart Satte ', state);
         return { loading: true };

      default:
         return state;
   }
};
export { fetchReducer, cartReducer };
