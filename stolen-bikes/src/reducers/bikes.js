import {
  GET_ALL,
  GET_BY_ID,
  GET_TOTAL,
  EMPTY,
  GET_ERROR,
  GET_BY_DATE,
} from '../actions/bikes';

const initialState = {
  bikes: [],
  bikeById: {},
  total: null,
  error: null,
  empty: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return { ...state, bikes: action.payload, error: null, empty: false };
    case GET_BY_DATE:
      return { ...state, bikes: action.payload, error: null, empty: false };
    case GET_BY_ID:
      return { ...state, bikeById: action.payload, error: null, empty: false };
    case GET_TOTAL:
      return { ...state, total: action.payload, error: null, empty: false };
    case EMPTY:
      return { bikes: [], bikeById: {}, total: null, error: null, empty: true };
    case GET_ERROR:
      return { ...state, error: action.payload, empty: false };
    default:
      return state;
  }
};
