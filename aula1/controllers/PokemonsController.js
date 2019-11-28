const { connect } = require('../models/Repository')
const pokemonsModel = require('../models/PokemonsSchema')

connect()



    

const getAll = (request, response) => {
  pokemonsModel.find((error, pokemons) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(pokemons)
  })
}

const getById = (request, response) => {
  const id = request.params.id

  return pokemonsModel.findById(id, (error, pokemon) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (pokemon) {
      return response.status(200).send(pokemon)
    }

    return response.status(404).send('Pokémon não encontrado.')
  })
}

const add = (request, response) => {
  const novoPokemon = new pokemonsModel(request.body)

  novoPokemon.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(novoPokemon)
  })
}
  const treinarNivel = (request, response) => {
  const id = request.params.id
  const dataInicio = new Date ("2019-11-25T19:25:04.861Z")
  const dataFim = new Date ("2019-11-25T19:25:04.861Z")
  const options = {new : true}
  const nivel=  Math.abs(new Date(dataInicio) - new Date(dataFim)) / 3600000 / 4

  
  

  pokemonsModel.findByIdAndUpdate(
    id,
    {nivel: nivel},
    options,
    (error, sucess) => {
      if (error){
        return response.SendStatus(500)
      }
      if (sucess){
        return response.SendStatus(201)
      }
    return response.SendStatus(404)
    }
  )
  }
  



const remove = (request, response) => {
  const id = request.params.id

  pokemonsModel.findByIdAndDelete(id, (error, pokemon) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (pokemon) {
      return response.status(200).send(id)
    }

    return response.status(404).send('Pokémon não encontrado.')
  })
}

const update = (request, response) => {
  const id = request.params.id
  const pokemonUpdate = request.body
  const options = { new: true }

  pokemonsModel.findByIdAndUpdate(
    id,
    pokemonUpdate,
    options,
    (error, pokemon) => {
      if (error) {
        return response.status(500).send(error)
      }

      if (pokemon) {
        return response.status(200).send(pokemon)
      }

      return response.status(404).send('Pokémon não encontrado.')
    }
  )
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  treinarNivel
}
