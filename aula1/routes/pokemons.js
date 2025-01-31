const express = require('express');
const router = express.Router();

const controller = require("../controllers/PokemonsController")

router.get('', controller.getAll)
router.post ('', controller.add)
router.patch('/:id', controller.treinarNivel)
router.get('/:id', controller.getById)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)
router.patch('/treinar/:id', controller.treinar)

module.exports = router
