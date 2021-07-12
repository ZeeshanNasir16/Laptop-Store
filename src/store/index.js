import { createStore, applyMiddleware, combineReducers } from 'redux';
import { getProductsReducer } from './reducer/productReducer';
import { cartReducer } from './reducer/cartReducer';
import { toastsReducer as toasts } from 'react-toastify-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middleware = [thunk];

const rootReducers = combineReducers({
   products: getProductsReducer,
   cart: cartReducer,
   toasts,
});

const store = createStore(
   rootReducers,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
