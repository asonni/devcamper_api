const express = require('express');

const router = express.Router();

const bootcampController = require('../controllers/bootcamps');
const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router
  .route('/radius/:zipcode/:distance')
  .get(bootcampController.getBootcampsInRadius);

router
  .route('/:id/photo')
  .put(
    protect,
    authorize('publisher', 'admin'),
    bootcampController.bootcampPhotoUpload
  );

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), bootcampController.getBootcamps)
  .post(
    protect,
    authorize('publisher', 'admin'),
    bootcampController.createBootcamp
  );

router
  .route('/:id')
  .get(bootcampController.getBootcamp)
  .put(
    protect,
    authorize('publisher', 'admin'),
    bootcampController.updateBootcamp
  )
  .delete(
    protect,
    authorize('publisher', 'admin'),
    bootcampController.deleteBootcamp
  );

module.exports = router;
