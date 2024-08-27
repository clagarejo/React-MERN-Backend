/*
    Event Routes
  /api/events
*/

const { Router } = require('express')
// Todas tienen que pasar por la validacion de JWT
const { validarJWT } = require('../middlewares/validar-jwt')
const { check } = require('express-validator')
const { ValidarCampos, validarCampos } = require('../middlewares/validar-campos')
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} = require('../controllers/events')
const { isDate } = require('../helpers/isDate')

const router = Router()
router.use(validarJWT)


// Obtener eventos
router.get('/', getEventos)

// Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
    validarCampos
  ],
  crearEvento
)

// Actualizar evento
router.put('/:id', actualizarEvento)

// Eliminar evento
router.delete('/:id', eliminarEvento)

module.exports = router