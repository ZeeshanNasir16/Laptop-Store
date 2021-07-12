import * as actionTypes from '../constants/constants';

const initialState = {
   totalItems: 0,
   lineItems: [],
   subTotal: 0,
   cart_id: '',
};

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.FETCH_REQUEST:
         return {
            loading: true,
            ...state,
         };

      case actionTypes.CART_FETCH_SUCCESS:
         return {
            loading: false,
            ...action.payload,
         };

      case actionTypes.FETCH_FAIL:
         return {
            loading: false,
            error: action.payload,
         };

      case actionTypes.CART_UPDATE_SUCCESS:
         return {
            ...state,
            ...action.payload,
         };

      case actionTypes.CART_UPDATE_FAIL:
         return {
            updating: 1,
            error: action.payload,
         };

      case actionTypes.CART_RESET:
         return { ...state, ...initialState };
      default:
         return state;
   }
};

export { cartReducer };
