import * as Types from '../actions/types'

const init = {
    studentLoggedIn: false,
    sessionExpiresIn: '',
    studentInfo: {},
}

const studentReducer = (state=init, action) => {
    switch(action.type) {
        case Types.SET_STUDENT: {
            return {
                ...state,
                studentInfo: action.payload.studentInfo,
                studentLoggedIn: Object.keys(action.payload.studentInfo).length !== 0
            }
        }
     
        default: return state
    }
} 

export default studentReducer