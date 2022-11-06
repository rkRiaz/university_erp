import React, { useEffect, useState } from 'react'
import '../Course.css'
import { Box, Button, Card, Grid, TextField, Chip } from '@material-ui/core'
import Axios from 'axios'
import Headline from '../../Headline'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';


function CourseEdit() {  
 

    const[values, setValues] = useState({
        code: '',
        title: '',
    })
    const { id } = useParams()

    useEffect(() => {
        Axios.get(`/api/course/get-course/${id}`)
        .then(res => {
            setValues(prev => res.data.result)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    
    const changeValue = name => e => {
        if(name == 'code') {
            setValues({ ...values, [name]: e.target.value.toUpperCase()})
        } else {
            setValues({ ...values, [name]: e.target.value });
        }
    }

    const submit = (e) => {
        e.preventDefault()
        Axios.put(`/api/course/edit/${id}`, values)
        .then(res => {
            console.log(res.data.result)
            alert(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="courseEdit">
            <Headline headline="Course Edit" title='Course Edit'/>
            <Card>
                <form onSubmit={submit}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="course__inputGroup">
                            <TextField error={false} helperText={"Name required"} required value={values.code} label="Course Code" onChange={changeValue('code')} variant="outlined" />
                            <TextField required value={values.title}  label="Course Title" onChange={changeValue('title')} variant="outlined" />
                        </Grid>
                        <Button style={{marginTop: 20}} type="submit" variant="contained" color="primary"> Save changes </Button>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default CourseEdit
