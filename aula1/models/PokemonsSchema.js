const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PokemonsSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  foto: { type: String, required: true },
  nivel: { type: Number },
  // dataInicio: {type: mongoose.Schema.Types.Date, auto: true, required: true} ,
  // dataFim: {type: mongoose.Schema.Types.Date, auto: true, required: true}

})

const pokemonsModel = mongoose.model('pokemons', PokemonsSchema);

module.exports = pokemonsModel;
