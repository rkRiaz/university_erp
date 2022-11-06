import { Button, Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Headline from '../../Headline'

import MegaTable from './MegaTable'

import { useToasts } from 'react-toast-notifications';


import '../Student.css'
import { useSelector } from 'react-redux'

function OfferedCourses() {
    const [courses, setCourses] = useState('')
    const [reload, setReload] = useState(false)
    const [selectedCourses, setSelectedCourses] = useState([])
    const [registeredCourse, setRegisteredCourse] = useState([])

    const { addToast } = useToasts();

    const { studentInfo } = useSelector((store) => store.student);



    useEffect(() => {
        axios.get(`/api/offered-courses/all`)
        .then(res => {
            setCourses(res.data.result[0])
        })
        .catch(err => {
            console.log(err)
        })

        axios.get(`/api/registered-courses/get-registered-courses-by-student-id/${studentInfo._id}`)
        .then(res => {
            setRegisteredCourse(res.data.result)
        })
        .catch(err => {
            console.log(err)
        })
        
    }, [reload])

    const submitHandler = () => {
        let final = {
            courses: selectedCourses,
            semester: courses.semester,
            student: "635ad89fdacfdb2f28e4adcc"
        }
        axios.post('/api/registered-courses/add', final)
        .then(res => {
            addToast(res.data.message, { appearance: 'success' });
            setReload(!reload)
        })
        .catch(err => {
            console.log(err);
        })
         console.log(final);
    }


    return (
        <div className="courses">
            <Headline headline={`Welcome ${studentInfo.name} to your dashboard`} title='Course Registration Section'/>
            <Card>
                <div className="course__table">
                       {
                           registeredCourse.length ?
                           <MegaTable
                                registeredCourse = {registeredCourse} 
                                selectedCourses={selectedCourses}
                                setSelectedCourses={setSelectedCourses}
                            />
                            :
                            <h3>Sorry! You don't registered any course yet.</h3>
                       }
                </div>
                <Button onClick={submitHandler} style={{marginTop: 20}} disabled={registeredCourse ? true: false} variant="contained" color="primary"> {registeredCourse ? "Submited": "Submit"} </Button>
            </Card>
        </div>
    )
}

export default OfferedCourses
