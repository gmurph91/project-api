var express = require('express');
var router = express.Router();
const codeAccess = require('../data_access_layer/apples')

router.get('/green', codeAccess.Green);
router.get('/red', codeAccess.Red);

module.exports = router;
