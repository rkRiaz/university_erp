import { Button, Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Headline from '../../Headline'
import MegaTable from './MegaTable'



import { useToasts } from 'react-toast-notifications';


import '../admin2.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';


function ApplicationEdit() {
    const [courses, setCourses] = useState([])
    const [reload, setReload] = useState(false)
    const [selectedCourses, setSelectedCourses] = useState([])
    const [registeredCourse, setRegisteredCourse] = useState(null)
    const [approved, setApproved] = useState("")

    const { addToast } = useToasts();

    const {id} = useParams()

    useEffect(() => {
            axios.get(`/api/registered-courses/get-registered-courses-by-id/${id}`)
            .then(res => {
            
                setRegisteredCourse(res.data.result)
                setCourses(res.data.offeredCourses)
                let ids = res.data.result[0].courses.map(c => { return c._id})
                setSelectedCourses(ids)
                console.log(res.data.result[0])
                setApproved(res.data.result[0].approved)
            })
            .catch(err => {
                console.log(err)
            })
    }, [reload])

    const submitHandler = () => {
        let final = {
            courses: selectedCourses,
            semester: courses.semester,
            approved: approved
        }
        axios.put(`/api/registered-courses/edit/${id}`, final)
        .then(res => {
            addToast(res.data.message, { appearance: 'success' });
            setReload(!reload)
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="courses">
            <Headline headline="Course Registration Section" title='Course Registration Section'/>
            <Card>
                <div className="course__table">
                   
                    <MegaTable 
                        offeredCourses = {courses} 
                        registeredCourse={registeredCourse}
                        selectedCourses={selectedCourses}
                        setSelectedCourses={setSelectedCourses}
                        approved={approved}
                        setApproved={setApproved}
                    />
                
               

                </div>
                <Button onClick={submitHandler} style={{marginTop: 20}} variant="contained" color="primary"> Submit </Button>
            </Card>
        </div>
    )
}

export default ApplicationEdit
