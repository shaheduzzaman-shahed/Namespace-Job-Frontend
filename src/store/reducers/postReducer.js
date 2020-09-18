
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
        };
    case "FETCH_COUPONS_ERROR":
        return {
          ...state,
          error: action.payload.error,
          loading: false,
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
      case "UPDATE_COUPON_SUCCESS":
        let c_id = state.items.findIndex(item => item.id == action.payload.data.id)
        state.items.splice(c_id,1,action.payload.data)
        return {
          ...state,
          error: null,
          loading: false,
          success: 'Coupon updated successfully!'
        };
      case "UPDATE_CATEGORY_ERROR":
        return {
          ...state,
          error: action.payload.error,
          loading: false,
        };
      case "DELETE_COUPON_SUCCESS":
        let d_id = state.items.findIndex(item => item.id == action.payload.data.id)
        state.items.splice(d_id,1)
        return {
          ...state,
          error: null,
          loading: false,
          success: action.payload.data.message
        };
      case "DELETE_COUPON_ERROR":
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
  