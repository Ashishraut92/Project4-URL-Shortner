const express = require('express');
const router = express.Router();
// const app = express();

const urlController = require('../Controller/urlController.js')

// router.post('/url/shorten', urlController.createurl);
router.get('/:urlCode', urlController.geturl);

module.exports = router;