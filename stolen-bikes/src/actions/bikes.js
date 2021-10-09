import { fetchBikes, fetchBikeById, fetchTotalStolen } from '../api';

export const GET_ALL = 'GET_ALL';
export const GET_BY_ID = 'GET_BY_ID';
export const GET_TOTAL = 'GET_TOTAL';
export const GET_BY_DATE = 'GET_BY_DATE';
export const GET_ERROR = 'GET_ERROR';
export const EMPTY = 'EMPTY';

export const getBikes =
  (page, query, from = '', to = '') =>
  async (dispatch) => {
    try {
      const { data } = await fetchBikes(page, query);
      if (from.length && to.length) {
        const newData = data.bikes.filter(
          (e) =>
            e.date_stolen > Math.round(new Date(from).getTime() / 1000) &&
            e.date_stolen < Math.round(new Date(to).getTime() / 1000),
        );
        if (newData.length === 0) {
          dispatch({ type: EMPTY, payload: data.bikes });
        }
        dispatch({ type: GET_BY_DATE, payload: newData });
      } else if (data.bikes.length === 0) {
        dispatch({ type: EMPTY, payload: data.bikes });
      } else {
        dispatch({ type: GET_ALL, payload: data.bikes });
      }
    } catch (error) {
      dispatch({ type: GET_ERROR, payload: error });
    }
  };

export const getBikeById = (id) => async (dispatch) => {
  try {
    const { data } = await fetchBikeById(id);
    dispatch({ type: GET_BY_ID, payload: data.bike });
  } catch (error) {
    dispatch({ type: GET_ERROR, payload: error });
  }
};

export const getTotalStolen = (query) => async (dispatch) => {
  try {
    const { data } = await fetchTotalStolen(query);
    if (data.stolen === 0) {
      dispatch({ type: EMPTY, payload: data.bikes });
    } else {
      dispatch({ type: GET_TOTAL, payload: data.stolen });
    }
  } catch (error) {
    dispatch({ type: GET_ERROR, payload: error });
  }
};
