var express = require('express');
var router = express.Router();
const listAccess = require('../data_access_layer/listaccess')

router.get('/getLists', listAccess.getLists);
router.get('/getItems', listAccess.getItems);
router.post('/createList', listAccess.createList);
router.post('/createItem', listAccess.createItem);
router.put('/updateItem/:id', listAccess.updateItem);
router.put('/updateList/:id', listAccess.updateList);
router.delete('/deleteItem/:id', listAccess.deleteItem);
router.delete('/deleteList/:id', listAccess.deleteList);

module.exports = router;
