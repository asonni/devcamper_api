const express = require('express');

const router = express.Router({ mergeParams: true });

const courseController = require('../controllers/courses');

const Course = require('../models/Course');

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }),
    courseController.getCourses
  )
  .post(
    protect,
    authorize('publisher', 'admin'),
    courseController.createCourse
  );

router
  .route('/:id')
  .get(courseController.getCourse)
  .put(protect, authorize('publisher', 'admin'), courseController.updateCourse)
  .delete(
    protect,
    authorize('publisher', 'admin'),
    courseController.deleteCourse
  );

module.exports = router;
