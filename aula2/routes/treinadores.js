const express = require('express');
const router = express.Router();

const controller = require("../controllers/TreinadoresController")


router.get('', controller.getAll)
router.post('', controller.add)
router.get('/:id', controller.getById)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)
router.post('/:treinadorId/pokemons', controller.addPokemon)
router.patch('/:treinadorId/pokemons/:pokemonId/treinar', controller.treinarPokemon)
<<<<<<< HEAD
router.get('')
=======
router.get('/:treinadorId/pokemons/:pokemonId', controller.getPokemonById)
router.patch('/:treinadorId/pokemons/:pokemonId', controller.updatePokemon)
>>>>>>> b54257e9794440fab7efa48b4995b8f9b9f44b1e

module.exports = router
