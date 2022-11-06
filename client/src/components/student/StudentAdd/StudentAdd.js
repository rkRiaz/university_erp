import React, { useState, useRef, useEffect } from 'react'

import '../Student.css'

import { Button, Card, Grid, TextField, Typography } from '@material-ui/core'


import Axios from 'axios'

import Headline from '../../Headline'

import { useToasts } from 'react-toast-notifications';
import { Link, useHistory } from 'react-router-dom';




function StudentAdd() {  
    const[values, setValues] = useState({
        name: '',
        student_id: '',
        batch: '',
        phone: '',
        email: '',
        password: "",
        confirmPassword: ""
    })
    const [batches, setBatches] = useState([])
    const { addToast } = useToasts();
    const history = useHistory()

    const changeValue = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const findBatchsArray = () => {
        for(let i=19; i<23; i++) {
            setBatches(prev => [...prev, 
            {name: `Spring-${i}`, value: `spring-${i}`},
            {name: `Summer-${i}`, value: `Summer-${i}`},
            {name: `Fall-${i}`, value: `fall-${i}`}
        ])
        }
    } 

    useEffect(() => {
        findBatchsArray()
    }, [])


    const submit = (e) => {
       e.preventDefault()
       const student = {
            name: values.name,
            student_id: values.student_id,
            batch: values.batch,
            phone: values.phone,
            email: values.email,
            password: values.password
       }
       if(values.password === values.confirmPassword) {
            Axios.post(`/api/student/add`, student)
            .then(res => {
                addToast(res.data.message, { appearance: 'success' });
                history.push("/student/login")
            })
            .catch(err => {
                console.log(err)
            })
       } else {
           alert("Password and Confrim Password do not match")
       }
    }

    return (
        <div className="studentAdd">
            <Headline headline="Registration Section" title='Registration Section'/>
            <Card>
                <form onSubmit={submit}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="student__inputGroup">
                            <TextField required placeholder="John Doe"  label="Student Name" onChange={changeValue('name')} variant="outlined" />
                            <TextField required placeholder="1901020010" label="Student Id" onChange={changeValue('student_id')} variant="outlined" />
                            <TextField select 
                                SelectProps={{ native: true }}
                                variant="outlined">
                                    <option value='cse'>CSE</option>
                            </TextField>
                            <TextField select required
                                SelectProps={{ native: true }}
                                onChange={changeValue('batch')}
                                variant="outlined">
                                    <option value=''>Select batch</option>
                                    {
                                        batches.map((b, i) => (
                                            <option key={b.value} value={b.value}>{b.name}</option>
                                        ))
                                    }
                            </TextField>
                            <TextField placeholder="01712012xxx" label="Phone" onChange={changeValue('phone')} variant="outlined" />
                            <TextField placeholder="johndoe@gmail.com" label="Email" onChange={changeValue('email')} variant="outlined" />
                            <TextField required placeholder="" label="Password" onChange={changeValue('password')} variant="outlined" />
                            <TextField required placeholder="" label="Confirm Password" onChange={changeValue('confirmPassword')} variant="outlined" />

                
                        </Grid>
                        <Button style={{marginTop: 20}} type="submit" variant="contained" color="primary"> Click to register </Button>
                    </Grid>
                </form>
                <Link to="/student/login"><Typography color="primary" style={{marginTop: 20}}>Already have an account? Please click here for login. </Typography></Link>
            </Card>
        </div>
    )
}

export default StudentAdd
