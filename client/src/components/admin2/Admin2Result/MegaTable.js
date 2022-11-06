import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, TextField} from '@material-ui/core';
import {Pagination, Alert} from '@material-ui/lab';
import {  DeleteOutlined, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios'




function MegaTable({registeredCourse, result, setResult}) {

  const changeHandler = (e, code, title) => {
    let a = {result: e.target.value, code, title}
    // setResult(prev => [...prev, {code, title, result: e.target.value}])
    // result.push(a)
  }


  return (

        <TableContainer className="megatable__body">
          <Table>
            <TableBody>
              <TableRow>
                  <TableCell style={{fontWeight: 700}}>Semester</TableCell>
                  <TableCell style={{fontWeight: 700}}>Courses</TableCell>
                  <TableCell style={{fontWeight: 700}}>Result</TableCell>

                </TableRow>
    
                <TableRow>
                  <TableCell>{registeredCourse.semester}</TableCell>
                  <TableCell>{
                    registeredCourse.courses?.map((c, i) => (
                         <TableRow key={c.code}>
                            <TableCell>{`${c.code}, (${c.title})`}</TableCell>
                          </TableRow>
                 
                    ))
                    }</TableCell>
                  <TableCell>{
                  registeredCourse.courses?.map((c, i) => (
                      <TableRow key={c.code}>
                          <TextField type="text" onChange={e => changeHandler(e, c.code, c.title)}  />                          
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