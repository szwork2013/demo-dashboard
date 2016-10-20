import axios from 'axios';
import { push } from 'react-router-redux';

// Constants.
import * as ProductsConstants from '_constants/ProductsConstants';

// Actions.
import * as ProfileActions from '_actions/ProfileActions';

// Data.
import productsData from '_data/products';

function requestLoadProducts() {
  return {
    type: ProductsConstants.LOAD_PRODUCTS_REQUEST,
  };
}

function receiveLoadProducts(products) {
  return {
    type: ProductsConstants.LOAD_PRODUCTS_SUCCESS,
    products,
  };
}

function receiveLoadProductsError(message) {
  return {
    type: ProductsConstants.LOAD_PRODUCTS_FAILURE,
    message,
  };
}

export function loadProducts() {
  return dispatch => {
    dispatch(requestLoadProducts());
    dispatch(receiveLoadProducts(productsData));
  };
}

function requestPayProduct(productId) {
  return {
    type: ProductsConstants.PAY_PRODUCT_REQUEST,
    productId,
  };
}

function receivePayProduct() {
  return {
    type: ProductsConstants.PAY_PRODUCT_SUCCESS,
  };
}

function receivePayProductError(message) {
  return {
    type: ProductsConstants.PAY_PRODUCT_FAILURE,
    message,
  };
}

export function payProduct(stripeToken, coupon, productId) {
  return dispatch => {
    dispatch(requestPayProduct(productId));
    axios({
      method: 'POST',
      url: '/api2/stripe/pay/',
      data: {
        stripeToken,
        coupon,
        productId,
      },
    })
      .then((response) => {
        setTimeout(() => {
          dispatch(receivePayProduct());
          dispatch(ProfileActions.loadUserProfile());
        }, 10000);
      })
      .catch((error) => {
      });
  };
}
