import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow, Checkbox} from '@material-ui/core';
import {Pagination, Alert} from '@material-ui/lab';
import {  DeleteOutlined, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios'



function MegaTable({offeredCourses, selectedCourses, setSelectedCourses, registeredCourse}) {

  const checkBoxHandler = (e, id) => {
    e.preventDefault()
    if(!selectedCourses.includes(id)) {
      setSelectedCourses([...selectedCourses, id])
    } else {
      let arr = selectedCourses.filter(s => s !== id)
      setSelectedCourses(arr)
    }
  }

  
  return (

        <TableContainer className="megatable__body">
          <Table>
            <TableBody>
              <TableRow>
                  <TableCell style={{fontWeight: 700}}>Semester</TableCell>
                  <TableCell style={{fontWeight: 700}}>Courses</TableCell>
                </TableRow>
    
                <TableRow>
                  <TableCell>{offeredCourses.semester}</TableCell>
                  <TableCell>{
                    offeredCourses.courses?.map((c, i) => (
                      <TableRow>
                        <TableCell padding="checkbox"><Checkbox onChange={e => checkBoxHandler(e, c._id)} checked={selectedCourses.includes(c._id) ? true : false} /></TableCell>
                        <TableCell>{`${c.code}, (${c.title})`}</TableCell>
                      </TableRow>
                    ))
                    }</TableCell>
                    
                      
                </TableRow>
              
             
              
            </TableBody>
          </Table>
        </TableContainer>


  );
}

export default MegaTable