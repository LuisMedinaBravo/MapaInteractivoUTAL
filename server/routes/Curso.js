const express = require('express')
const API = require('../controllrs/apiCurso')
const router = express.Router();


router.post('/Curso', API.createCurso)
router.get('/Curso', API.getAllCursos)
router.get('/Curso/:id', API.getCurso)
router.put('/Curso/:id', API.putCurso)
router.delete('/Curso/:id', API.deleteCurso)

module.exports = router;