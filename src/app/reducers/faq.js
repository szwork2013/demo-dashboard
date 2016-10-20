// Constants.
import * as FaqConstants from '_constants/FaqConstants';

const initialState = {
  isFetching: false,
  isFetched: false,
  categories: null,
  activeCategory: null,
  questions: null,
  errorMessage: '',
};

export default function faq(state = initialState, action = {}) {
  switch (action.type) {
    case FaqConstants.LOAD_FAQ_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FaqConstants.LOAD_FAQ_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        categories: action.categories,
        questions: action.questions,
      };
    case FaqConstants.LOAD_FAQ_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        categories: null,
        questions: null,
        errorMessage: action.message,
      };
    default:
      return state;
  }
}
