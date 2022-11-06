import { Button, Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Headline from '../../Headline'
import MegaTable from './MegaTable'
import MegaTable2 from './MegaTable2'


import { useToasts } from 'react-toast-notifications';


import '../Student.css'
import { useSelector } from 'react-redux'


function OfferedCourses() {
    const [courses, setCourses] = useState('')
    const [reload, setReload] = useState(false)
    const [selectedCourses, setSelectedCourses] = useState([])
    const [registeredCourse, setRegisteredCourse] = useState(null)

    const { addToast } = useToasts();

    const { studentInfo } = useSelector((store) => store.student);

    useEffect(() => {
        axios.get(`/api/offered-courses/all`)
        .then(res => {
            setCourses(res.data.result[0])
            axios.get(`/api/registered-courses/get-registered-course-by-student-id-and-semester/${studentInfo._id}/${res.data.result[0].semester}`)
            .then(res => {
                console.log(res.data.result)
                setRegisteredCourse(res.data.result)
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })

 
        
    }, [reload])

    const submitHandler = () => {
        let final = {
            courses: selectedCourses,
            semester: courses.semester,
            student: studentInfo._id
        }
        if(selectedCourses.length === 0) {
            alert("Please select valid courses")
        } else {
            axios.post('/api/registered-courses/add', final)
            .then(res => {
                addToast(res.data.message, { appearance: 'success' });
                setReload(!reload)
            })
            .catch(err => {
                console.log(err);
            })
        }
 
    }


    return (
        <div className="courses">
            <Headline headline="Course Registration Section" title='Course Registration Section'/>
            <Card>
                <div className="course__table">
                    {
                        registeredCourse ?
                       <>
                       {
                           registeredCourse.approved ?
                           <h3 style={{marginBottom: 20, color: "green"}}>Application Approved</h3> :
                            <h3 style={{marginBottom: 20}}>Course Registration Application Completed. Wait for approaval</h3>
                       }
                        
                        <MegaTable2
                        offeredCourses = {courses} 
                        registeredCourse={registeredCourse}/>
                       </>
                    
                    :
                    <MegaTable 
                        offeredCourses = {courses} 
                        registeredCourse={registeredCourse}
                        selectedCourses={selectedCourses}
                        setSelectedCourses={setSelectedCourses}
                />
                    }
               
                   
             
                </div>
                <Button onClick={submitHandler} style={{marginTop: 20}} disabled={registeredCourse ? true : false} variant="contained" color="primary"> Submit </Button>
            </Card>
        </div>
    )
}

export default OfferedCourses
