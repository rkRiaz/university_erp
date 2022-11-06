import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, Chip} from '@material-ui/core';
import {Pagination, Alert} from '@material-ui/lab';
import {  DeleteOutlined, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios'



function MegaTable2({registeredCourse, selectedCourses, setSelectedCourses}) {



  return (

        <TableContainer className="megatable__body">
          {
            registeredCourse.map(r => (
              <Table key={r._id}>
                <TableBody>
                  <TableRow>
                      <TableCell style={{fontWeight: 700}}>Semester</TableCell>
                      <TableCell style={{fontWeight: 700}}>Courses</TableCell>
                      <TableCell style={{fontWeight: 700}}>Approval</TableCell>
    
                    </TableRow>
        
                    <TableRow>
                      <TableCell>{r.semester}</TableCell>
                      <TableCell>{
                        r.courses?.map((c, i) => (
                          <TableRow>
                            <TableCell>{`${c.code}, (${c.title})`}</TableCell>
                          </TableRow>
                        ))
                        }</TableCell>
                        <TableCell>{r.approved ?
                        <Chip label="Approad" variant="outlined" />
                        :
                        <Chip label="Pending" variant="outlined" />
                    }</TableCell>
                    </TableRow>
                  
        
                </TableBody>
              </Table>
            ))
          }
        </TableContainer>


  );
}

export default MegaTable2