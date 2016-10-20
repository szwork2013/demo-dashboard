// Constants.
import * as ProductsConstants from '_constants/ProductsConstants';

const initialState = {
  isFetching: false,
  isFetched: false,
  isPaying: false,
  isPayingProductId: null,
  isPaid: false,
  products: null,
  errorMessage: '',
};

export default function products(state = initialState, action = {}) {
  switch (action.type) {
    case ProductsConstants.LOAD_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
      };
    case ProductsConstants.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        products: action.products,
      };
    case ProductsConstants.LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        products: null,
      };
    case ProductsConstants.PAY_PRODUCT_REQUEST:
      return {
        ...state,
        isPaying: true,
        isPayingProductId: action.productId,
        isPaid: false,
      };
    case ProductsConstants.PAY_PRODUCT_SUCCESS:
      return {
        ...state,
        isPaying: false,
        isPayingProductId: null,
        isPaid: true,
      };
    case ProductsConstants.PAY_PRODUCT_FAILURE:
      return {
        ...state,
        isPaying: false,
        isPaid: false,
      };
    default:
      return state;
  }
}
