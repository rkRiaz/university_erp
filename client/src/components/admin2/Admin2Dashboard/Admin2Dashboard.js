import { Button, Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Headline from '../../Headline'

import MegaTable from './MegaTable'

import { useToasts } from 'react-toast-notifications';

import '../admin2.css'
import { useSelector } from 'react-redux'

function Admin2Dashboard() {
    const [reload, setReload] = useState(false)
    const [registeredCourse, setRegisteredCourse] = useState([])


    useEffect(() => {

        axios.get(`/api/registered-courses/all`)
        .then(res => {
            console.log(res.data.result)
            setRegisteredCourse(res.data.result)
        })
        .catch(err => {
            console.log(err)
        })
        
    }, [reload])



    return (
        <div className="courses">
            <Headline headline="Course Registration Section" title='Course Registration Section'/>
            <Card>
                <div className="course__table">
               
                        <MegaTable
                            registeredCourse = {registeredCourse} 
                            setReload={setReload}
                        />
                     
                </div>
            </Card>
        </div>
    )
}

export default Admin2Dashboard
