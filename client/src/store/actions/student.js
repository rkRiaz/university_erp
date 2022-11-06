import * as Types from './types'
import jwtDecode from 'jwt-decode'
import axios from 'axios'


export const login = (loginInfo, history, addToast) => async (dispatch) => {
    axios.put('/api/student/login', loginInfo)
    .then(res => {
        let token = res.data.token
        localStorage.setItem('student_auth', token)
        // setAuthToken(token)
        let decodeToken = jwtDecode(token)
        console.log(decodeToken)

        dispatch({
            type: Types.SET_STUDENT,
            payload: {
                studentInfo: decodeToken
            }
        })
        history.push("/student/dashboard")
        addToast("Login Success", { appearance: 'success' });
    }) 
    .catch(error => {
        addToast("Something wrong", { appearance: 'error' });
    })

   
}

export const logoutAction = (history) => dispatch => {
    localStorage.removeItem('student_auth')
    dispatch({
        type: Types.SET_STUDENT,
        payload: {
            studentInfo: {}
        }
    })
    history.push("/student/login")
}



