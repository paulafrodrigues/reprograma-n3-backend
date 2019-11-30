const chai = require('chai')
const mocha = require('mocha')
const jogo = require('../../jogo')
const expect = chai.expect

describe('Jogo | Unit', () => {
    context('quando número gerado for maior que o número informado', () => {
        it('retorna a mensagem "Tente um número menor!"', () => {
            const numeroGerado = 50
            const resposta = 51

            const resultado = jogo(numeroGerado, resposta)

            expect(resultado).to.be.an('object')
            expect(resultado.mensagemErro).to.be.equal('Tente um número menor!')
        })
    })

    context('quando o número gerado for menor que o número informado', () => {
        it('retorna a mensagem "Tente um número maior!"', () => {
            const numeroGerado = 50
            const resposta = 46

            const resultado = jogo(numeroGerado, resposta)

            expect(resultado).to.be.an('object')
            expect(resultado.mensagemErro).to.be.equal('Tente um número maior!')
        })
    })  

    context('quando o número gerado for igual ao informado', () => {
        it('retorna um objeto com a chave acertou como "true"', () => {
            const numeroGerado = 30
            const resposta = 30

            const resultado = jogo(numeroGerado, resposta)

            expect(resultado).to.be.an('object')
            expect(resultado.acertou).to.be.true
        })
    })

    context('quando a resposta informada não for um número válido', () => {
        it('retorna a mensagem "Não é um número válido!"', () => {
            const numeroGerado = 40
            const resposta = 'abchdjnebabd'

            const resultado = jogo(numeroGerado, resposta)

            expect(resultado).to.be.an('object')
            expect(resultado.mensagemErro).to.be.equal('Não é um número válido!')
        })
    })
})


