import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import applicationReducer from "./applicationReducer";


export default combineReducers({
  auth: authReducer,
  post: postReducer,
  application: applicationReducer,

});
