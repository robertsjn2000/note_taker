const express = require('express');
const router = express.Router();

const notes = require('./notes.js')
router.use('/notes', notes)

module.exports = router