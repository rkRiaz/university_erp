const Student = require('../models/Student')
const { validationResult } = require('express-validator')
const {errorFormatter} = require('../utils/errorFormatter')
const jwt = require('jsonwebtoken')
 

exports.login = async (req, res, next) => {
    // let errors = validationResult(req).formatWith(errorFormatter)
    // if(!errors.isEmpty()) {
    //     return res.status(400).json(errors.mapped())
    // }
    const {student_id, password} = req.body
    try{
        let findStudent = await Student.findOne({student_id: student_id})
        if(findStudent && findStudent.student_id == student_id && findStudent.password == password) {
                let token = jwt.sign({
                    _id: findStudent._id,
                    name: findStudent.name,
                }, 'secret_key_1234', {expiresIn: '24h'})
                res.status(200).json({
                    message: 'Login Success',
                    token: token,
                    expiresIn: 86400 
                })
        } else {
            res.status(400).json({message: "Wrong Credentials!"})
        }
    } catch(e) {
        next(e)
    }
}

exports.getStudentById = async (req, res, next) => {
    try{
        let {id} = req.params
        let response = await Student.findOne({_id: id})
        res.status(200).json({
            result: response,
            message: "Fetched data by id"
        });
    }
    catch(err) {
        next(err)
    }
}

exports.add = async (req, res, next) => {
    // let errors = validationResult(req).formatWith(errorFormatter)
    // if(!errors.isEmpty()) {
    //     return res.status(422).json(errors.mapped())
    // }
    console.log(req.body);
    try{
        const newStudent = new Student(req.body)
        let response = await newStudent.save(req.body) 
        res.status(200).json({
            message: "Successfully Registered",
            result: response
        })
    } catch (e) {
        next(e)
    }
}




// exports.getStudentsByBatch = async (req, res, next) => {
//     try{
//         let {batch} = req.params
//         let response = await Student.find({batch})
//         res.status(200).json({
//             result: response,
//             message: "Fetched all data"
//         });
//     }
//     catch(err) {
//         next(err)
//     }
// }


// exports.edit = async (req, res, next) => {
//     // let errors = validationResult(req).formatWith(errorFormatter)
//     // if (!errors.isEmpty()) {
//     //     return res.status(400).json(errors.mapped())
//     // }
//     try {
//         const { id } = req.params
//         const updatedData = req.body;
//         const response = await Student.findOneAndUpdate({ _id: id }, { $set: updatedData } , {new: true})
//         return res.status(200).json({
//             message: 'Successfully Updated',
//             result: response
//         })
//     }
//     catch(err) {
//         next(err)
//     }
// }

// exports.deleteStudent = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const response = await Student.findOneAndDelete({_id: id})
//         return res.status(200).json({
//             message: 'Deleted',
//             result: response
//         })
//     }
//     catch(err) {
//         next(err)
//     }
// }


// exports.allStudents = async (req, res, next) => {
//         try {
//             const response = await Student.find()
//             return res.status(200).json({
//                 message: 'Successfully fetched all data',
//                 result: response
//             })
//         }
//         catch(err) {
//             next(err)
//         }
//     }