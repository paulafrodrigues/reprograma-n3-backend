const jogo = (numeroGerado, resposta) => {
    if(numeroGerado > resposta){
        return {
            'acertou': false,
            'mensagemErro': 'Tente um número maior'
        }
    }else if( numeroGerado < resposta) {
        return {
            'acertou': false,
            'mensagemErro': 'Tente um número menor'
        }
    }else{
        return { 'acertou': true}
    }
}

module.exports = jogo 