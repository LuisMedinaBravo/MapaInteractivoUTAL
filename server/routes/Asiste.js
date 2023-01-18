const express = require('express')
const API = require('../controllrs/apiAsiste')
const router = express.Router();


router.post('/Asiste', API.createAsiste)
router.get('/Asiste', API.getAllAsistes)
router.get('/Asiste-Estudiante/:id', API.getAsisteByIdEstudiante)
router.get('/Asiste/:id', API.getAsiste)
router.put('/Asiste/:id', API.putAsiste)
router.delete('/Asiste/:id', API.deleteAsiste)

module.exports = router;