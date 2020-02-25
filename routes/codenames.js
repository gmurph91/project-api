var express = require('express');
var router = express.Router();
const codeAccess = require('../data_access_layer/codeaccess')

router.get('/words', codeAccess.Index);

module.exports = router;
