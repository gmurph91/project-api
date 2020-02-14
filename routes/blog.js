var express = require('express');
var router = express.Router();
const blogAccess = require('../data_access_layer/blogaccess')

router.get('/', blogAccess.Index);

module.exports = router;
