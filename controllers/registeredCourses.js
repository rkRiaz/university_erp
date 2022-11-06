
const RegisteredCourses = require('../models/RegisteredCourses')
const OfferedCourses = require('../models/OfferedCourses')


exports.allRegisteredCourses = async (req, res, next) => {
    try {
        const response = await RegisteredCourses.find().populate({path: "courses", model: "Course"}).populate('student')
        return res.status(200).json({
            message: 'Successfully fetched all data',
            result: response.reverse()
        })
    }
    catch(err) {
        next(err)
    }
}

exports.getRegisteredCoursesById = async (req, res, next) => {
    const { id } = req.params
    try {
        const response = await RegisteredCourses.find({_id: id}).populate({path: "courses", model: "Course"}).populate('Student')
        const response1 = await OfferedCourses.findOne({ semester: response[0].semester}).populate({path: "courses", model: "Course"})

        return res.status(200).json({
            message: 'Successfully fetched all data',
            result: response,
            offeredCourses: response1 ? response1 : null
        })
    }
    catch(err) {
        next(err)
    }
}

exports.getRegisteredCoursesByStudentId = async (req, res, next) => {
    const { id } = req.params
 
    try {
        const response = await RegisteredCourses.find({student: id}).populate({path: "courses", model: "Course"}).populate('Student')
        return res.status(200).json({
            message: 'Successfully fetched all data',
            result: response.reverse()
        })
    }
    catch(err) {
        next(err)
    }
}

exports.getRegisteredCoursesByStudentIdAndSemseter = async (req, res, next) => {
    const { id, semester } = req.params
 
    try {
        const response = await RegisteredCourses.findOne({student: id, semester: semester})
        return res.status(200).json({
            message: 'Get data',
            result: response
        })
    }
    catch(err) {
        next(err)
    }
}



exports.add = async (req, res, next) => {
    
    try{
        const response1 = await RegisteredCourses.findOne({student: req.body.student, semester: req.body.semester}).populate({path: "courses", model: "Course"}).populate('Student')
        if(response1) {
            return res.status(200).json({
                message: "Alredy Submitted",
            })
        }
        const newRegisteredCourses = new RegisteredCourses({...req.body, approved: false})
        let response = await newRegisteredCourses.save() 
        res.status(200).json({
            message: "Successfully added",
            result: response
        })
    } catch (e) {
        next(e)
    }
}


exports.edit = async (req, res, next) => {
    // let errors = validationResult(req).formatWith(errorFormatter)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json(errors.mapped())
    // }
    try {
        const { id } = req.params

        const updatedData = req.body;
    // return console.log(updatedData)

        const response = await RegisteredCourses.findOneAndUpdate({ _id: id }, { $set: updatedData } , {new: true})
        return res.status(200).json({
            message: 'Successfully Updated',
            result: response
        })
    }
    catch(err) {
        next(err)
    }
}

exports.deletenewRegisteredCourses = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await RegisteredCourses.findOneAndDelete({_id: id})
        return res.status(200).json({
            message: 'Deleted',
            result: response
        })
    }
    catch(err) {
        next(err)
    }
}