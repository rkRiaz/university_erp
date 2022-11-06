import React, { useState, useEffect } from 'react'
import { PersonOutline, LockOpen } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import '../OfferedCourses.css'
import Headline from '../../Headline'
import {Link, useHistory, useParams} from 'react-router-dom'
import { Box, Button, Card, Chip, Grid, TextField, Typography } from '@material-ui/core';
import axios from 'axios';


function OfferedCoursesEdit() {
    const[values, setValues] = useState({
        courses: [],
        semester: ""
    })
    const [reload, setReload] = useState(false)
    const [errors, setErrors] = useState({})
    const { addToast } = useToasts();
    const history = useHistory()
    const [batches, setBatches] = useState([])
    const [courses, setCourses] = useState([])


    const {id} =useParams()

    const findBatchsArray = () => {
        for(let i=22; i<=23; i++) {
            setBatches(prev => [...prev, 
            {name: `Spring-${i}`, value: `spring-${i}`},
            {name: `Summer-${i}`, value: `summer-${i}`},
            {name: `Fall-${i}`, value: `fall-${i}`}
        ])
        }
    } 

    useEffect(() => {
        findBatchsArray()
        axios.get(`/api/course/all`)
        .then(res => {
            setCourses(res.data.result);
            axios.get(`/api/offered-courses/get-registered-courses-by-id/${id}`)
            .then(res => {
                setValues({semester: res.data.result[0].semester, courses: res.data.result[0].courses})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    
    }, [reload])

    console.log(values)
 

    const changeValue = name => e => {
        if(name == 'courses') {
            if(e.target.value) {

                let obj = JSON.parse(e.target.value)

                values.courses.push(obj)
            
               const cleanArray = Object.values(values.courses.reduce((acc,cur)=>Object.assign(acc,{[cur._id]:cur}),{}))

              setValues({ ...values, [name]: cleanArray });

            }
        } else {
            setValues({ ...values, [name]: e.target.value });
        }
    };

    

    const submit = e => {
        e.preventDefault()
        let arr = values.courses.map(c => { return c._id })
        let final = {courses: arr, semester: values.semester}
        console.log(final)
        axios.put(`/api/offered-courses/edit/${id}`, final)
        .then(res => {
            addToast(res.data.message, { appearance: 'success' });
            setReload(!reload)
        })
        .catch(err => {
            setErrors(err.response.data)
        })
    }


    const removeTag = (e, id) => {
        e.preventDefault()
        const tags = values.courses.filter(c => c._id !== id)
        setValues({ ...values, 'courses': tags });
    }

    

    return (
        <div className="offeredCoursesAdd">
            <Headline headline="Course Offer Section" title='Course Offer Section'/>
            <Card>
                <form onSubmit={submit} className="offeredCoursesAdd__form">
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="course__inputGroup">
                            <TextField select required
                                SelectProps={{ native: true }}
                                onChange={changeValue('semester')}
                                variant="outlined">
                                    <option value={values.semester}>{values.semester}</option>
                                    {
                                        batches.reverse().map((b, i) => (
                                            <option key={i} value={b.value}>{b.name}</option>
                                        ))
                                    }
                            </TextField>

                            <TextField select required={values.courses.length === 0 ? true : false}
                                SelectProps={{ native: true }}
                                onChange={changeValue('courses')}
                                variant="outlined">
                                    <option value="">Add Courses</option>
                                    {
                                        courses.map((c, i) => (
                                            <option key={c._id} value={JSON.stringify(c)}>{`${c.code}, ${c.title}`}</option>
                                        ))
                                    }
                            </TextField>

                            <Box sx={{ display: 'flex' }}>
                                {  
                                    values.courses.map((c, i) => (
                                        <Chip key={c._id} label={c.code+", "+c.title} variant="outlined" onDelete={e => removeTag(e, c._id)} />
                                    ))
                                }
                            </Box>
                            <Button style={{marginTop: 20}} type="submit" variant="contained" color="primary"> Submit </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default OfferedCoursesEdit
