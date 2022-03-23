import * as actionTypes from '../../types'

export const toggleCollapseAction = () => ({
  type: actionTypes.TOGGLE_COLLAPSE,
})

export const selectSubmenuAction = (key) => ({
  type: actionTypes.SELECT_SUBMENU,
  payload: key,
})

export const setPlatformAction = (payload) => ({
  type: actionTypes.SET_PLATFORM,
  payload,
})
