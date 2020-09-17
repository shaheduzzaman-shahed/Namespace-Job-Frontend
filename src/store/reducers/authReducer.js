
const initState = {
    token: null,
    isLoggedIn: false,
    profile:null,
    loading: false,
    error: null
  };
  export default function (state = initState, action) {
    switch (action.type) {
      case "SIGNIN_SUCCESS":
        const nstate = {
          ...state,
          token: action.payload.token,
          profile: action.payload.profile,
          isLoggedIn: true,
          loading: false,
          error:null
        };
        localStorage.setItem("token", action.payload.token);
        return nstate;
      case "AUTH_LOADING":
        return {
          ...state,
          loading: true
        }
  
      case "LOGOUT_SUCCESS":
        localStorage.removeItem("token")
        return {
          ...state,
          token: null,
          profile: null,
          isLoggedIn: false,
          error: null,
          loading: false
        };
  
      case 'LOGOUT_ERROR':
        console.log('logout error')
        return { ...state, error: action.payload.error, loading: false };
  
      case 'SIGNIN_ERROR':
        console.log('signin error')
        return { ...state, error: action.payload.error, loading: false };
  
      case 'SIGNUP_ERROR':
        console.log('signup error')
        return { ...state, error: action.payload.error, loading: false };
  
      default:
        return state;
    }
  }
  