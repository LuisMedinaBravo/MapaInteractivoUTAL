const express = require('express')
const API = require('../controllrs/apiEstudiante')
const router = express.Router();


router.post('/Estudiante', API.createEstudiante)
router.post('/Estudiante/login', API.validarUsuario)
router.get('/Estudiante', API.getAllEstudiantes)
router.get('/Estudiante/:dni', API.getEstudiante)
router.put('/Estudiante/:id', API.putEstudiante)
router.delete('/Estudiante/:id', API.deleteEstudiante)




module.exports = router;