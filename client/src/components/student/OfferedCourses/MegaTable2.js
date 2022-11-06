import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, Chip} from '@material-ui/core';
import {Pagination, Alert} from '@material-ui/lab';
import {  DeleteOutlined, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios'



function MegaTable2({offeredCourses, registeredCourse}) {


  
  return (

        <TableContainer className="megatable__body">
          <Table>
            <TableBody>
              <TableRow>
                  <TableCell style={{fontWeight: 700}}>Semester</TableCell>
                  <TableCell style={{fontWeight: 700}}>Courses</TableCell>
                  <TableCell style={{fontWeight: 700}}>Approaval</TableCell>

                </TableRow>
    
                <TableRow>
                  <TableCell>{registeredCourse.semester}</TableCell>
                  <TableCell>{
                    offeredCourses.courses?.map((c, i) => (
                      <TableRow>
                        <TableCell padding="checkbox"><Checkbox checked={registeredCourse.courses.includes(c._id) ? true : false} /></TableCell>
                        <TableCell>{`${c.code}, (${c.title})`}</TableCell>
                      </TableRow>
                    ))
                    }
                </TableCell>
                <TableCell>{registeredCourse.approved ?
                    <Chip label="Approved"/>
                    :
                    <Chip label="Pending" variant="outlined" />
                }</TableCell>
     
                      
                </TableRow>
              
             
              
            </TableBody>
          </Table>
        </TableContainer>


  );
}

export default MegaTable2