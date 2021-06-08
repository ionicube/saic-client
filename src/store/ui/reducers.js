import * as actionTypes from './actionTypes'

export const initialState = {
  loading: false,
  hasShadow: true,
  error: null
}
function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.SHOW_LOADING:
      return {
        ...state,
        loading: true
      }

    case actionTypes.HIDE_LOADING:
      return {
        ...state,
        loading: false
      }

    case actionTypes.CHANGE_NAV_STYLE:
      return {
        ...state,
        hasShadow: payload.hasShadow
      }

    case actionTypes.HAS_ERROR:
      return {
        ...state,
        error: payload.error
      }

    default:
      return state
  }
}

export default reducer
