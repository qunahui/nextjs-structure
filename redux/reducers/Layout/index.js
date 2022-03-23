import * as actionTypes from '../../types'

const DEFAULT_STATE = {
  collapsed: false,
  selectedSubmenu: 0,
  platform: null,
}

const LayoutReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_COLLAPSE:
      return { ...state, collapsed: !state.collapsed }
    case actionTypes.SELECT_SUBMENU:
      return {
        ...state,
        selectedSubmenu: action.payload == state.selectedSubmenu ? null : action.payload,
      }
    case actionTypes.SET_PLATFORM:
      return { ...state, platform: action.payload }
    default:
      return state
  }
}

export default LayoutReducer
