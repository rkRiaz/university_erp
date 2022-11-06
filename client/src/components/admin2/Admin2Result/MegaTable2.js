import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, TextField} from '@material-ui/core';
import {Pagination, Alert} from '@material-ui/lab';
import {  DeleteOutlined, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios'




function MegaTable2({setResult, result}) {


  return (

        <TableContainer className="megatable__body">
          <Table>
            <TableBody>
              <TableRow>
                  <TableCell style={{fontWeight: 700}}>Courses</TableCell>
                  <TableCell style={{fontWeight: 700}}>Result</TableCell>

                </TableRow>
    
                <TableRow>
                  <TableCell>{
                    result.map((c, i) => (
                         <TableRow>
                            <TableCell>{`${c.code}, (${c.title})`}</TableCell>
                          </TableRow>
                 
                    ))
                    }</TableCell>
                  <TableCell>{
                  result.map((c, i) => (
                      <TableRow>
                          <TextField type="text" onChange={e => setResult(prev => [...prev, {code: c.code, title: c.title, result: e.target.value}])}/>                          
                      </TableRow>
                  ))
                  }</TableCell>
                </TableRow>
  
            </TableBody>
          </Table>
        </TableContainer>


  );
}

export default MegaTable2