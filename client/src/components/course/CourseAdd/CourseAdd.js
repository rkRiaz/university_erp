import React, { useEffect, useState, useRef } from 'react'
import { Box, Button, Card, Chip, Grid, TextField } from '@material-ui/core'


import Axios from 'axios'
import Headline from '../../Headline'
import '../Course.css'
import { useSelector } from 'react-redux';

function CourseAdd() {  
    
    const[values, setValues] = useState({
        code: '',
        title: '',
    })


    const changeValue = name => e => {
        if(name == 'course') {
            if(e.target.value) {
                const tags = [...values.batch, e.target.value]
                setValues({ ...values, [name]: [...new Set(tags)] });
            }
        } else if(name == 'code') {
            setValues({ ...values, [name]: e.target.value.toUpperCase()})
        } else {
            setValues({ ...values, [name]: e.target.value });
        }
        
    };


    const submit = (e) => {
        e.preventDefault()
        Axios.post(`/api/course/add`, values)
        .then(res => {
            alert(`Added successfully`)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="courseAdd">
            <Headline headline="Course Add" title='Course Add'/>
            <Card>
                <form onSubmit={submit}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="course__inputGroup">
                            <TextField error={false} helperText={false ? "Name required" : null} required placeholder="CSE-330" label="Course Code" onChange={changeValue('code')} variant="outlined" />
                            <TextField required placeholder="Computer Networks" label="Course Title" onChange={changeValue('title')} variant="outlined" />
                        </Grid>
                        <Button style={{marginTop: 20}} type="submit" variant="contained" color="primary"> Add Course </Button>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default CourseAdd
