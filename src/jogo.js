// embaralhar(['a', 'b', 'c']) → ['c', 'a', 'b'] (uma ordem diferente
// a cada vez)
function embaralhar(lista) {
    return lista.toSorted(() => Math.random() - 0.5);
}

// escolherSimbolos(['a', 'b', 'c', 'd'], 2) → dois deles, sorteados
export function escolherSimbolos(simbolos, quantidade) {
    return embaralhar(simbolos).filter((simbolo, posicao) => posicao < quantidade);
}

// criarBaralho(['🍕', '🚀']) → ['🚀', '🍕', '🍕', '🚀'], embaralhado
export function criarBaralho(simbolos) {
    const pares = [];
    simbolos.forEach((simbolo) => {
        pares.push(simbolo);
        pares.push(simbolo);
    });
    return embaralhar(pares);
}

// verificarPar('🍕', '🍕') → true
export function verificarPar(simboloA, simboloB) {
    return simboloA === simboloB;
}

// verificarSeTerminou(8, 8) → true
export function verificarSeTerminou(paresEncontrados, totalDePares) {
    return paresEncontrados >= totalDePares;
}