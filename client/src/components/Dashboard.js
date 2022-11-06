import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import Headline from './Headline'
import {CustomizedTables} from './Table'
import {Card, TextField, Typography} from '@material-ui/core';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import { ReportTable2 } from './ReportTable2';


const Dashboard = React.memo(() => {
    // const { teacherInfo } = useSelector(state => state.teacher)
    const [attendances, setAttendances] = useState('')
    const[students, setStudents] = useState([])
    const[courses, setCourses] = useState('')
    const { addToast } = useToasts();


    useEffect(() => {
  
    }, [])


    return (
        <div className="dashboard">
            <Headline headline="Quick Statistics" title="Dashboard"/>
            <div className="dashboard__body">

                <Card className="dashboard__bodyThirdRow">
                    <div style={{color: "#E57498", marginTop: 10, borderBottom: '1px solid rgb(240, 236, 236)'}}>
                        <Typography variant="h5">ERP Dashboard</Typography>
                    </div>
                
    
                </Card>

            
            </div>
        </div>
    )
})

export default Dashboard
