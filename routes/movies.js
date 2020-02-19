var express = require('express');
var router = express.Router();
const movieAccess = require('../data_access_layer/movieaccess')

router.get('/', movieAccess.Index);
// router.get('/:id', movieAccess.Movie);
router.post('/new', movieAccess.Create);
router.put('/update/:id', movieAccess.Update);
router.delete('/delete/:id', movieAccess.Destroy)

module.exports = router;
