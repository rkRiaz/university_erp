import React from 'react';
import "./App.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import MenuSidebar from './components/sidebar/MenuSidebar'
import TopBar from './components/TopBar'

import Dashboard from './components/Dashboard'

import Login from './components/login/Login'

import StudentAdd from './components/student/StudentAdd/StudentAdd'
import StudentEdit from './components/student/StudentEdit/StudentEdit'
import StudentLogin from './components/student/StudentLogin/StudentLogin'
import StudentDashboard from './components/student/StudentDashboard/StudentDashboard'
import StudentOfferedCourses from './components/student/OfferedCourses/OfferedCourses'

import CourseAdd from './components/course/CourseAdd/CourseAdd'
import CourseEdit from './components/course/CourseEdit/CourseEdit'
import Courses from './components/course/Courses/Courses'

import OfferedCoursesAdd from './components/offeredCourses/offeredCoursesAdd/OfferedCoursesAdd'
import OfferedCourses from './components/offeredCourses/offeredCourses/OfferedCourses'
import OfferedCoursesEdit from './components/offeredCourses/offeredCoursesEdit/OfferedCoursesEdit'

import Admin2Dashboard from './components/admin2/Admin2Dashboard/Admin2Dashboard'
import ApplicationEdit from './components/admin2/ApplicationEdit/ApplicationEdit'
import Admin2Result from './components/admin2/Admin2Result/Admin2Result'





import AttendanceAdd from './components/attendance/AttendanceAdd/AttendanceAdd'
import AttendanceEdit from './components/attendance/AttendanceEdit/AttendanceEdit'
import Attendances from './components/attendance/Attendances/Attendances'
import { useSelector } from 'react-redux';



function App() {
  const { studentLoggedIn } = useSelector(state => state.student)
  
  return (
    <div className="app">
      {
        // !teacherLoggedIn ?
        // <BrowserRouter>
        //   <Switch>
        //     <Route exact path="/" component={Login}/>
        //     <Route exact path="/teacher/add" component={TeacherAdd}/>
        //   </Switch>
        // </BrowserRouter>
        // :
        
        <div className="app__body">
          {console.log(studentLoggedIn)}
          <BrowserRouter>
              <MenuSidebar/>
              <div className="app__bodyRight">
                <TopBar/>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    

                    <Route exact path="/student/dashboard" component={StudentDashboard}/>
                    <Route exact path="/student/offered-courses" component={StudentOfferedCourses}/>
                    <Route exact path="/student/login" component={StudentLogin}/>
                    <Route exact path="/student/add" component={StudentAdd}/>
                    <Route exact path="/student/edit/:id" component={StudentEdit}/>

                    <Route exact path="/admin1/courses" component={Courses}/>
                    <Route exact path="/admin1/course/add" component={CourseAdd}/>
                    <Route exact path="/admin1/course/edit/:id" component={CourseEdit}/>

                    <Route exact path="/admin1/courses" component={Courses}/>
                    <Route exact path="/admin1/course/edit/:id" component={CourseEdit}/>

                    <Route exact path="/admin1/offered-courses/all" component={OfferedCourses}/>
                    <Route exact path="/admin1/offered-courses/add" component={OfferedCoursesAdd}/>
                    <Route exact path="/admin1/offered-courses/edit/:id" component={OfferedCoursesEdit}/>


                    <Route exact path="/admin1/offered-courses/add" component={CourseEdit}/>
                    <Route exact path="/admin1/offered-courses/edit/:id" component={CourseEdit}/>

                    <Route exact path="/admin2/all-application" component={Admin2Dashboard}/>
                    <Route exact path="/admin2/application-edit/:id" component={ApplicationEdit}/>
                    <Route exact path="/admin2/result-add/:id" component={Admin2Result}/>





                    <Route exact path="/attendances" component={Attendances}/>
                    <Route exact path="/attendance/add" component={AttendanceAdd}/>
                    <Route exact path="/attendance/edit/:id" component={AttendanceEdit}/>

                </Switch>
              </div>
          </BrowserRouter>
      </div> 
      }
    </div>
  );
}

export default App;
