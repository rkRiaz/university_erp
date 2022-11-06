import React, { useState } from 'react'
import { PersonOutline, LockOpen } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import './StudentLogin.css'
import {Link, useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import { login } from '../../../store/actions/student'
import axios from 'axios';
import * as Types from '../../../store/actions/types';
import jwtDecode from 'jwt-decode'


function StudentLogin() {
    const[values, setValues] = useState({
        student_id: '',
        password: '',
    })

    const [errors, setErrors] = useState({})
    const { addToast } = useToasts();
    const history = useHistory()
    const dispatch = useDispatch()

    const changeValue = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const submit = e => {
        e.preventDefault()
        dispatch(login(values, history, addToast))
    }
    return (
        <div className="login">
            <form onSubmit={submit} className="login__form">
                <h1>Student Login</h1>
                <div className="text_box">
                    <PersonOutline />
                    <input onChange={changeValue('student_id')} className="user-name" type="text" placeholder="Student Id"/>
                </div>
                {errors.id ?  <Typography variant="caption" color="secondary" display="block" gutterBottom>{errors.id}</Typography> : ""}	
                <div className="text_box">
                    <LockOpen />
                    <input onChange={changeValue('password')} className="password" type="text" placeholder="Password"/>
                </div>
                {errors.password ?  <Typography variant="caption" color="secondary" display="block" gutterBottom>{errors.password}</Typography> : ""}
                <div className="button">
                    <input className="btn" type="submit" placeholder="" name="" value="Log In" />
                </div>
                <Link to="/student/add"><Typography color="primary">Don't have account? Please click here for registration. </Typography></Link>
            </form>
        </div>
    )
}

export default StudentLogin
