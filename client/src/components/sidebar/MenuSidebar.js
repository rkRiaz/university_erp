import React, {useEffect, useState} from 'react'
import './MenuSidebar.css'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {ExpandMoreOutlined,
        ExpandLessOutlined,
        HomeOutlined,
        SupervisorAccountOutlined,
        PermIdentity,
        AttachMoneyOutlined,
        QuestionAnswerOutlined,
        PhoneIphoneOutlined,
        EmailOutlined,
        } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {logoutAction} from '../../store/actions/student'
import { Button } from '@material-ui/core';

    
const SideBar = () => {
    const { studentInfo } = useSelector(state => state.student)
    const [open, setOpen] = useState({
        dashboardDrawer: true,
        admin1Drawer: false,
        admin2Drawer: false,
        studentDrawer: false
    })

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if(history.location.pathname !== "/") {
            setOpen({
                dashboardDrawer: false
            })
        }
    }, [])

    const openDrawer = type => e => {
        e.preventDefault()

        if(type === 'dashboardDrawer') {
            setOpen({[type]: true})
            history.push('/')
        }

        if(window.innerWidth > 1024) {
            switch(type) {
                case 'admin1Drawer':
                    setOpen({ ...open, dashboardDrawer: false, [type]: !open.admin1Drawer})
                break
                case 'admin2Drawer':
                    setOpen({...open, dashboardDrawer: false, [type]: !open.admin2Drawer})
                break
                case 'studentDrawer':
                    setOpen({ ...open, dashboardDrawer: false, [type]: !open.studentDrawer})
                break 
            }
        } else {
            switch(type) {
                case 'admin1Drawer':
                    setOpen({dashboardDrawer: false, [type]: !open.admin1Drawer})
                break
                case 'admin2Drawer':
                    setOpen({...open, dashboardDrawer: false, [type]: !open.admin2Drawer})
                break
                case 'studentDrawer':
                    setOpen({ ...open, dashboardDrawer: false, [type]: !open.studentDrawer})
                break
            }
        }
    };


    return (
        <div className="sidebar">
            <Link to="/" className="sidebar__logo">
                <PermIdentity/> Admin Panel 
            </Link>

            <div className="sidebar__item">
                <div onClick={openDrawer('dashboardDrawer')} className={`sidebar__itemIcon ${open.dashboardDrawer && 'sidebar__itemIconBg'}`}>
                    <div className="sidebar__itemIconLeft">
                        <HomeOutlined /> <span> Dashboard </span>
                    </div>
                </div>
            </div>

 
            <div className="sidebar__item">
                <div onClick={openDrawer('admin1Drawer')} className={`sidebar__itemIcon ${open.admin1Drawer && 'sidebar__itemIconBg'}`}>
                    <div className="sidebar__itemIconLeft">
                        <SupervisorAccountOutlined/> <span> Admin1 Drawer </span>
                    </div>
                    <span> {open.admin1Drawer ? <ExpandLessOutlined/> : <ExpandMoreOutlined/>} </span>
                </div>
                <div className={`sidebar__itemDrawer ${open.admin1Drawer && 'sidebar__itemDrawerOpen'}`}>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/admin1/course/add">Add Course</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/admin1/courses">All Courses</NavLink>

                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/admin1/offered-courses/add">Add Offered Courses</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/admin1/offered-courses/all">All Offered Courses</NavLink>
                </div>
            </div>
            

            <div className="sidebar__item">
                <div onClick={openDrawer('admin2Drawer')} className={`sidebar__itemIcon ${open.admin2Drawer && 'sidebar__itemIconBg'}`}>
                    <div className="sidebar__itemIconLeft">
                        <SupervisorAccountOutlined/> <span> Admin2 Drawer </span>
                    </div>
                    <span> {open.admin2Drawer ? <ExpandLessOutlined/> : <ExpandMoreOutlined/>} </span>
                </div>
                <div className={`sidebar__itemDrawer ${open.admin2Drawer && 'sidebar__itemDrawerOpen'}`}>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/admin2/all-application">All applications</NavLink>
                </div>
            </div>


            <div className="sidebar__item">
                <div onClick={openDrawer('studentDrawer')} className={`sidebar__itemIcon ${open.studentDrawer && 'sidebar__itemIconBg'}`}>
                    <div className="sidebar__itemIconLeft">
                        <SupervisorAccountOutlined/> <span> Student </span>
                    </div>
                    <span> {open.studentDrawer ? <ExpandLessOutlined/> : <ExpandMoreOutlined/>} </span>
                </div>
                <div className={`sidebar__itemDrawer ${open.studentDrawer && 'sidebar__itemDrawerOpen'}`}>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/student/dashboard">Student Dashboard</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/student/offered-courses">Offered Courses</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/student/login">Student Login</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/student/add">Student Registration</NavLink>
                    <Button style={{color: "white"}} onClick={() => dispatch(logoutAction(history))} activeClassName="sidebar__itemDrawerActive" to="#">Student Logout</Button>

                  
                </div>
            </div>
        




            <div className="sidebar__contact">
                <div className="sidebar__contactHeading">
                    <QuestionAnswerOutlined /> Need Help
                </div>
                <div className="sidebar__contactItem">
                    <PhoneIphoneOutlined /> +880 {" "} 16846 {" "} 80383
                </div>
                <div className="sidebar__contactItem">
                    <EmailOutlined /> mdriaz9587@gmail.com
                </div>
                <div className="sidebar__contactItem">
                    Copy Rights &copy; 2022
                </div>
            </div>

        </div>
    )
}

export default SideBar
