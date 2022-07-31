const initialState = {
  data: []
}

export const appsReducer = (state=initialState,action) => {
  if (action.type === "GET_APPS_GRAPH_DATA") {
    if (state.data === action.payload) {
      return state;
    }
    else {
      const newState = { ...state };
      const newData = action.payload;
      newState.data = newData;
      return newState;
    }
  } 
  else return state;
  }