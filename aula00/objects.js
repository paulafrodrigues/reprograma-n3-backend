class Garrafa {
    constructor(tipo, cor, conteudo) {
        this._tipo = tipo
        this._cor = cor
        this._conteudo = conteudo
    }

    get tipo() {
        return this._tipo
    }

    get cor() {
        return this._cor
    }

    get conteudo() {
        return this._conteudo
    }

    mudarConteudo(conteudo) {
        return conteudo
    }
}

const bonafont = new Garrafa('plástico', 'laranja', 'água')
console.log(bonafont.mudarConteudo('Suco'))