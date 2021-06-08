import * as actionTypes from './actionTypes'

export function showLoading () {
  return {
    type: actionTypes.SHOW_LOADING
  }
}

export function hideLoading () {
  return {
    type: actionTypes.HIDE_LOADING
  }
}

export function changeNavStyle ({ hasShadow }) {
  return {
    type: actionTypes.CHANGE_NAV_STYLE,
    payload: { hasShadow }
  }
}

export function hasError (error) {
  return {
    type: actionTypes.HAS_ERROR,
    payload: { error }
  }
}
