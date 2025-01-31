const { connect } = require('../models/Repository')
const treinadoresModel = require('../models/TreinadoresSchema')
const { pokemonsModel } = require('../models/PokemonsSchema')
const bcript = require('../bcript')

connect()

const calcularNivel = (inicio, fim, nivelAtual) => {
  const diff = Math.abs(new Date(inicio) - new Date(fim)) / 3600000

  return (diff / 4) + nivelAtual;
}

const getAll = (request, response) => {
  const token = request.get('authorization') 
  const decode = jwt.verify(token, CHAVE_PUBLICA, (error, decode) => {
    if (error) {
      autenticado = false
    } else {
      autenticado = true
    }
  })
  treinadoresModel.find((error, treinadores) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(treinadores)
  })
}

const getById = (request, response) => {
  const id = request.params.id
  
  return treinadoresModel.findById(id, (error, treinador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (treinador) {
      return response.status(200).send(treinador)
    }

    return response.status(404).send('Treinador não encontrado.')
  })
}

const add = (request, response) => {
  const senhaCriptografada = bcript.hashSync(request.body.senha)
  request.body.senha = senhaCriptografada //pega a senha informada, transforma em hash e muda a senha informada para o hash criado
  const novoTreinador = new treinadoresModel(request.body)

  novoTreinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(novoTreinador)
  })
}

const login = async (request, response) => {
  const email = request.body.email
  const senha = request.body.senha
  const treinador = await treinadoresModel.findOne({ email })
  const senhaValida = bcrypt.compareSync(senha, treinador.senha)

  if (senhaValida) {
    const token = jwt.sign(
      { id: treinador.id, email: treinador.email }, // isso é o payload, heade não é necessário
      PRIVATE_KEY // serve para gerar a criptografia do token
    )

    return response.status(200).send({ token })
  }

  return response.status(401).send('Usuário ou senha inválidos')
}

const remove = (request, response) => {
  const id = request.params.id

  treinadoresModel.findByIdAndDelete(id, (error, treinador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (treinador) {
      return response.status(200).send(id)
    }

    return response.status(404).send('Treinador não encontrado.')
  })
}

const update = (request, response) => {
  const id = request.params.id
  const treinadorUpdate = request.body
  const options = { new: true }

  treinadoresModel.findByIdAndUpdate(
    id,
    treinadorUpdate,
    options,
    (error, treinador) => {
      if (error) {
        return response.status(500).sned(error)
      }

      if (treinador) {
        return response.status(200).send(treinador)
      }

      return response.status(404).send('Treinador não encontrado.')
    }
  )
}

const addPokemon = async (request, response) => {
  const treinadorId = request.params.treinadorId
  const pokemon = request.body
  const novoPokemon = new pokemonsModel(pokemon)
  const treinador = await treinadoresModel.findById(treinadorId)
  
  treinador.pokemons.push(novoPokemon)
  treinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(treinador)
  })
}

const treinarPokemon = async (request, response) => {
  const treinadorId = request.params.treinadorId
  const pokemonId = request.params.pokemonId
  const inicio = request.body.inicio
  const fim = request.body.fim
  const treinador = await treinadoresModel.findById(treinadorId)
  const pokemon = treinador.pokemons.find((pokemon) => pokemonId == pokemon._id)
  const novoNivel = calcularNivel(inicio, fim, pokemon.nivel)

  pokemon.nivel = novoNivel
  treinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(treinador)
  })
}

const getPokemonById = async (request, response) => {
  const treinadorId = request.body.treinadorId
  const pokemonId = request.body.pokemonId
  const treinador = await treinadoresModel.findById(treinadorId)
  const pokemon = treinador.pokemons.find((pokemon) => {
    return pokemonId == pokemon._id
  })

  if (pokemon) {
    return response.status(200).send(pokemon)
  }

  return response.status(404).send('Pokémon não encontrado')
}

const getAllPokemons = async (request, response) => {
  const treinadorId = request.params.id
  const treinador = await treinadoresModel.findById(id)

  if (treinador) {
    return response.status(200).send(treinador.pokemon)
  }

    return response.status(404).send("Treinador não encontrado")
}

const updatePokemon = (request, response) => {
  const treinadorId = request.params.treinadorId
  const pokemonId = request.params.pokemonId
  const pokemon = request.body

  treinadoresModel.findOneAndUpdate(
    { _id: treinadorId, 'pokemons.$._id': pokemonId },
    { $set:
        {
          'pokemons.$.nome': pokemon.nome,
          'pokemons.$.foto': pokemon.foto
        }
    },
    { new: true },
    (error, treinador) => {
      if (error) {
        return response.status(500).send(error)
      }

      return response.status(200).send(treinador)
    }
  )
}

module.exports = {
  getAll,
  getById,
  getAllPokemons,
  add,
  login,
  remove,
  update,
  addPokemon,
  treinarPokemon,
  getPokemonById,
  updatePokemon
}
