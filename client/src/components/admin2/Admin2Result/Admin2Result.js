import { Button, Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Headline from '../../Headline'
import MegaTable from './MegaTable'

import { useToasts } from 'react-toast-notifications';

import '../admin2.css'
// import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import MegaTable2 from './MegaTable2';


function Admin2Result() {
    const [reload, setReload] = useState(false)
    const [registeredCourse, setRegisteredCourse] = useState(null)
    const [result, setResult] = useState([])
    const { addToast } = useToasts();
    const { id } = useParams()

    useEffect(() => {
            axios.get(`/api/registered-courses/get-registered-courses-by-id/${id}`)
            .then(res => {
                console.log(res.data.result)
                setRegisteredCourse(res.data.result[0])
            })
            .catch(err => {
                console.log(err)
            })
    }, [reload])

    const submitHandler = () => {

        let final = {
            // result: result.filter((v,i,a)=>a.findIndex(v2=>(v2.code===v.code))===i)
            result: result
        }
        console.log(final)
        // axios.put(`/api/registered-courses/edit/${id}`, final)
        // .then(res => {
        //     addToast(res.data.message, { appearance: 'success' });
        //     setReload(!reload)
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }


    return (
        <div className="courses">
            <Headline headline="Course Registration Section" title='Course Registration Section'/>
            <Card>
                <div className="course__table">
                   
                   {
                      

                       registeredCourse ?
                       <MegaTable 
                            registeredCourse={registeredCourse}
                            result={result}
                            setResult={setResult}
                        />
                        :
                        <h3>Loading</h3>
                       
                   }
                
               

                </div>
                <Button onClick={submitHandler} style={{marginTop: 20}} variant="contained" color="primary"> Submit </Button>
            </Card>
        </div>
    )
}

export default Admin2Result
