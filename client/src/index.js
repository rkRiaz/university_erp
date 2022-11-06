import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastProvider } from 'react-toast-notifications'

import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import * as Types from './store/actions/types'


let studentToken = localStorage.getItem('student_auth')
if(studentToken) {
  let decodeToken = jwtDecode(studentToken)
  setAuthToken(studentToken)
  store.dispatch({
        type: Types.SET_STUDENT,
        payload: {
            studentInfo: decodeToken
        } 
  })
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider autoDismiss autoDismissTimeout={4000}>
          <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


