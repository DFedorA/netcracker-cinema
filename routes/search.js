const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/film');

const router = express.Router();
router.get('/', controller.getAll);
router.get('/:name', controller.search);

module.exports = router;
