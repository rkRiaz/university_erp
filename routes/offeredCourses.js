const router = require("express").Router();

const {
  add,
  edit,
  deleteOfferedCourse,
  allOfferedCourses,
  getOfferedCoursesById,
} = require("../controllers/offeredCourses");

router.post("/add", add);
router.get("/get-registered-courses-by-id/:id", getOfferedCoursesById); //id=attendanceId
router.get("/all", allOfferedCourses);
router.put("/edit/:id", edit); //id=attendanceId
router.delete("/delete/:id", deleteOfferedCourse);//id=attendanceId

module.exports = router;
