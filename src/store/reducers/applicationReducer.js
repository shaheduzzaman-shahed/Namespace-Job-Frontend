
const initState = {
  items: [],
  loading: false,
  error: null,
  success: null,
};
export default function (state = initState, action) {
  switch (action.type) {
    case "FETCH_APPLICATIONS_SUCCESS":
      return {
        ...state,
        items: action.payload.data,
        error: null,
        loading: false,
      };
  case "FETCH_APPLICATIONS_ERROR":
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    
    case "APPLICATION_LOADING":
      return {
        ...state,
        loading: true
      }



    default:
      return state;
  }
}
