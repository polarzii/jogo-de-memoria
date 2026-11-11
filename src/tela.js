const tabuleiro = document.querySelector('.tabuleiro');
const botaoPausar = document.querySelector('.botao-pausar');

const textoTempo = document.querySelector('.tempo');
const textoJogadas = document.querySelector('.jogadas');
const textoRecorde = document.querySelector('.recorde');

const telaFim = document.querySelector('.fim');
const textoFimTempo = document.querySelector('.fim-tempo');
const textoFimJogadas = document.querySelector('.fim-jogadas');

const seloNovoRecorde = document.querySelector('.novo-recorde');
const textoHistoricoVazio = document.querySelector('.historico-vazio');
const listaHistorico = document.querySelector('.lista-historico');

// Com mais de 8 pares, o tabuleiro passa a ter seis colunas.
export function ajustarTabuleiro(quantidadeDePares) {
    if (quantidadeDePares > 8) {
        tabuleiro.classList.add('nivel-dificil');
    } else {
        tabuleiro.classList.remove('nivel-dificil');
    }
}

// Uma carta (um botão) para cada símbolo. O clique avisa quem
// chamou, com a posição da carta.
export function desenharCartas(baralho, aoClicar) {
    tabuleiro.innerHTML = '';
    baralho.forEach((simbolo, posicao) => {
        const carta = document.createElement('button');
        carta.type = 'button';
        carta.classList.add('carta');
        carta.setAttribute('aria-label', 'Carta ' + (posicao + 1));

        const interno = document.createElement('span');
        interno.classList.add('carta-interno');

        const frente = document.createElement('span');
        frente.classList.add('carta-frente');
        frente.textContent = '?';

        const verso = document.createElement('span');
        verso.classList.add('carta-verso');
        verso.textContent = simbolo;

        interno.appendChild(frente);
        interno.appendChild(verso);
        carta.appendChild(interno);
        carta.addEventListener('click', () => {
            aoClicar(posicao);
        });
        tabuleiro.appendChild(carta);
    });
}

// Uma carta fica virada.
export function virarCarta(posicao) {
    tabuleiro.children[posicao].classList.add('virada');
}

export function desvirarCartas(posicaoA, posicaoB) {
    tabuleiro.children[posicaoA].classList.remove('virada');
    tabuleiro.children[posicaoB].classList.remove('virada');
}

// Um par encontrado fica virado, verde, e não clica mais.
export function marcarPar(posicaoA, posicaoB) {
    [posicaoA, posicaoB].forEach((posicao) => {
        const carta = tabuleiro.children[posicao];
        carta.classList.add('encontrada');
        carta.disabled = true;
    });
}

export function atualizarTempo(texto) {
    textoTempo.textContent = texto;
}

export function atualizarJogadas(jogadas) {
    textoJogadas.textContent = jogadas;
}

export function mostrarRecorde(texto) {
    textoRecorde.textContent = texto;
}

// Pausado: o tabuleiro fica borrado (o CSS cuida disso) e o botão
// passa a dizer "Continuar".
export function mostrarPausa(pausado) {
    if (pausado) {
        tabuleiro.classList.add('pausado');
        botaoPausar.textContent = 'Continuar';
    } else {
        tabuleiro.classList.remove('pausado');
        botaoPausar.textContent = 'Pausar';
    }
}

export function mostrarFim(tempo, jogadas) {
    textoFimTempo.textContent = tempo;
    textoFimJogadas.textContent = jogadas;
    telaFim.classList.remove('escondida');
}

export function esconderFim() {
    telaFim.classList.add('escondida');
}

export function mostrarNovoRecorde(bateuRecorde) {
    if (bateuRecorde) {
        seloNovoRecorde.classList.remove('escondida');
    } else {
        seloNovoRecorde.classList.add('escondida');
    }
}

// Recebe as linhas prontas, uma por partida.
export function mostrarHistorico(linhas) {
    listaHistorico.innerHTML = '';
    if (linhas.length === 0) {
        textoHistoricoVazio.classList.remove('escondida');
        return;
    }
    textoHistoricoVazio.classList.add('escondida');
    linhas.forEach((linha) => {
        const item = document.createElement('li');
        item.textContent = linha;
        listaHistorico.appendChild(item);
    });
}