const express = require('express');
const passport = require('passport');
const controller = require('../controllers/feedback');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id',passport.authenticate('jwt',{session:false}), controller.remove);
router.post('/', controller.create);



module.exports = router;
