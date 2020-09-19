
const initState = {
    items: [],
    loading: false,
    error: null,
    success: null,
  };
  export default function (state = initState, action) {
    switch (action.type) {
      case "FETCH_POSTS_SUCCESS":
        return {
          ...state,
          items: action.payload.data,
          error: null,
          loading: false,
          success: null
        };
    case "FETCH_POSTS_ERROR":
        return {
          ...state,
          error: action.payload.error,
          loading: false,
          success:''
        };
      case "ADD_POST_SUCCESS":
        return {
          ...state,
          items: [action.payload.data,...state.items],
          error: null,
          loading: false,
          success: "Post Added Successfully",

        };
      case "ADD_POST_ERROR":
        return {
          ...state,
          error: action.payload.error,
          loading: false,
          success: null,

        };
     
      case "DELETE_POST_SUCCESS":
        let d_id = state.items.findIndex(item => item.id == action.payload.data.id)
        state.items.splice(d_id,1)
        return {
          ...state,
          error: null,
          loading: false,
          success: "post deleted successfully"
        };
      case "DELETE_POST_ERROR":
        return {
          ...state,
          error: action.payload.error,
          loading: false,
          success: null,
        };
      case "APPLY_JOB_SUCCESS":
        return {
          ...state,
          loading: false,
        };
      case "POST_LOADING":
        return {
          ...state,
          loading: true
        }
  

  
      default:
        return state;
    }
  }
  