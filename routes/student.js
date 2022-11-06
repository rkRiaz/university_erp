const router = require('express').Router()
const {add, getStudentById, login} = require('../controllers/student')

router.put('/login', login)
router.post('/add', add)
// router.get('/all', allStudents)
router.get('/get-student-by-id/:id', getStudentById)
// router.get('/get-students-by-batch/:batch', getStudentsByBatch)
// router.put('/edit/:id', edit)
// router.delete('/delete/:id', deleteStudent)

module.exports = router