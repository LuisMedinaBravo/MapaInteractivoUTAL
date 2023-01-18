const express = require('express')
const API = require('../controllrs/apiEdificio')
const router = express.Router();


router.post('/Edificio', API.createEdificio)
router.get('/Edificio', API.getAllEdificios)
router.get('/Edificio-sala/:nombre', API.getEdificioBySalaID)
router.get('/Edificio-salanombre/:nombre', API.getEdificioBySalaNombre)
router.get('/Edificio/:id', API.getEdificio)
router.put('/Edificio/:id', API.putEdificio)
router.put('/Edificio-actualizar',API.actualizarSalas)
router.delete('/Edificio/:id', API.deleteEdificio)




module.exports = router;