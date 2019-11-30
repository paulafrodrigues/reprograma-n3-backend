const readline = require('readline')
const jogo = require('./jogo')
const numeroGerado = parseInt(Math.random()*(100 -1) +1)
console.log(numeroGerado)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const perguntar = () => {
    rl.question('Adivinhe o número secreto: ', resposta => {
      const resultado = jogo(numeroGerado, resposta)

      if (resultado.acertou) {
        console.log('Parabéns! Você acertou.')
        return rl.close()
      }

      console.log(resultado.mensagemErro)
      perguntar()
  })
}

perguntar()
