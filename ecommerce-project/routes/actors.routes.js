const express = require('express');
const { body } = require('express-validator');

// Controllers
const {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deleteActor
} = require('../controllers/actors.controller');

// Middlewares
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware');
const {
  createActorValidators,
  validateResult
} = require('../middlewares/validators.middleware');
const { actorExists } = require('../middlewares/actors.middleware');

// Utils
const { upload } = require('../util/multer');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllActors)
  .post(
    protectAdmin,
    upload.single('img'),
    createActorValidators,
    validateResult,
    createActor
  );

router
  .use('/:id', actorExists)
  .route('/:id')
  .get(getActorById)
  .patch(protectAdmin, updateActor)
  .delete(protectAdmin, deleteActor);

module.exports = { actorsRouter: router };
