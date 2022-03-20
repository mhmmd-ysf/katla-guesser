const initialState = {
  kbbi: [],
  loading: false,
}

export function reducer(state = initialState, action) {
  // console.count("masuk")
  console.log("masuk reducer", action.type)
  // console.log(action?.payload?.length)
  switch(action.type) {
    case 'SET_KBBI': {
      const { payload } = action
      return !state?.kbbi?.length ? {
        ...state,
        kbbi: payload,
        loading: false,
      } : state
    }
    case "SET_LOADING_TRUE": {
      return {
        ...state,
        loading: true
      }
    }
    case "SET_LOADING_FALSE": {
      return {
        ...state,
        loading: false
      }
    }
    default: return state
  }
}