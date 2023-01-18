const express = require('express')
const API = require('../controllrs/apiSala')
const router = express.Router();


router.post('/Sala', API.createSala)
router.get('/Sala', API.getAllSalas)
router.get('/Sala/:id', API.getSala)
router.put('/Sala/:id', API.putSala)
router.delete('/Sala/:id', API.deleteSala)




module.exports = router;