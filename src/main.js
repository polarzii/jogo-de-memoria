import { temas } from './cartas.js';

import {
    escolherSimbolos,
    criarBaralho,
    verificarPar,
    verificarSeTerminou
} from './jogo.js';

import {
    carregarRecorde,
    registrarTempo
} from './recorde.js';

import {
    carregarHistorico,
    registrarPartida,
    formatarData
} from './historico.js';

import {
    iniciarCronometro,
    pararCronometro,
    pausarCronometro,
    continuarCronometro,
    formatarTempo
} from './cronometro.js';

import {
    ajustarTabuleiro,
    desenharCartas,
    virarCarta,
    desvirarCartas,
    marcarPar,
    atualizarTempo,
    atualizarJogadas,
    mostrarRecorde,
    mostrarPausa,
    mostrarFim,
    esconderFim,
    mostrarNovoRecorde,
    mostrarHistorico
} from './tela.js';


let baralho = [];
let primeiraCarta = null;   // a posição da primeira carta virada
let travado = false;        // true enquanto duas cartas erradas estão à mostra
let jogadas = 0;
let paresEncontrados = 0;
let comecou = false;        // o relógio só começa no primeiro clique
let totalDePares = 0;
let pausado = false;
let terminou = false;

const NOMES_DOS_NIVEIS = { 6: 'Fácil', 8: 'Médio', 12: 'Difícil' };

const campoTema = document.querySelector('.campo-tema');
const campoNivel = document.querySelector('.campo-nivel');


function novaPartida() {
    pararCronometro();
    totalDePares = Number(campoNivel.value);
    const simbolos = escolherSimbolos(temas[campoTema.value], totalDePares);
    ajustarTabuleiro(totalDePares);
    baralho = criarBaralho(simbolos);
    primeiraCarta = null;
    travado = false;
    jogadas = 0;
    paresEncontrados = 0;
    comecou = false;
    pausado = false;
    terminou = false;
    mostrarPausa(pausado);
    atualizarJogadas(jogadas);
    atualizarTempo(formatarTempo(0));
    esconderFim();
    desenharCartas(baralho, escolherCarta);
    mostrarRecordeAtual();
}


// Uma carta (um botão) para cada símbolo. O clique avisa quem
// chamou, com a posição da carta.
function mostrarRecordeAtual() {
    const recorde = carregarRecorde();
    if (recorde === null) {
        mostrarRecorde('—');
    } else {
        mostrarRecorde(formatarTempo(recorde));
    }
}

function escolherCarta(posicao) {
    if (travado || pausado || posicao === primeiraCarta) {
        return;
    }
    if (!comecou) {
        comecou = true;
        iniciarCronometro((segundos) => {
            atualizarTempo(formatarTempo(segundos));
        });
    }

    virarCarta(posicao);

    // A primeira carta da jogada: só guarda e espera a segunda.
    if (primeiraCarta === null) {
        primeiraCarta = posicao;
        return;
    }

    // A segunda carta: conta a jogada e confere o par.
    const segundaCarta = posicao;
    jogadas = jogadas + 1;
    atualizarJogadas(jogadas);

    if (verificarPar(baralho[primeiraCarta], baralho[segundaCarta])) {
        marcarPar(primeiraCarta, segundaCarta);
        paresEncontrados = paresEncontrados + 1;
        primeiraCarta = null;
        if (verificarSeTerminou(paresEncontrados, totalDePares)) {
            terminarPartida();
        }
    } else {
        // Errou: as duas ficam à mostra por um instante e desviram.
        travado = true;
        const cartaA = primeiraCarta;
        primeiraCarta = null;
        setTimeout(() => {
            desvirarCartas(cartaA, segundaCarta);
            travado = false;
        }, 900);
    }
}


// Só dá para pausar com o relógio correndo.
function alternarPausa() {
    if (!comecou || terminou) {
        return;
    }
    pausado = !pausado;
    if (pausado) {
        pausarCronometro();
    } else {
        continuarCronometro();
    }
    mostrarPausa(pausado);
}


function terminarPartida() {
    terminou = true;
    const segundos = pararCronometro();
    const bateuRecorde = registrarTempo(segundos);
    mostrarFim(formatarTempo(segundos), jogadas);
    mostrarNovoRecorde(bateuRecorde);
    mostrarRecordeAtual();

    // A data vira texto para poder ir para o localStorage
    registrarPartida({
        data: new Date().toISOString(),
        nivel: NOMES_DOS_NIVEIS[totalDePares],
        segundos: segundos,
        jogadas: jogadas
    });
    mostrarHistoricoAtual();
}


// Cada partida vira uma linha: '09/11, 16:42 · Médio · 1:05 · 9 jogadas'
function mostrarHistoricoAtual() {
    const linhas = carregarHistorico().map((partida) => {
        return formatarData(partida.data) + ' · ' + partida.nivel + ' · ' +
            formatarTempo(partida.segundos) + ' · ' + partida.jogadas + ' jogadas';
    });
    mostrarHistorico(linhas);
}


document.querySelector('.botao-recomecar').addEventListener('click', novaPartida);

document.querySelector('.botao-jogar-de-novo').addEventListener('click', novaPartida);
campoTema.addEventListener('change', novaPartida);

campoNivel.addEventListener('change', novaPartida);
document.querySelector('.botao-pausar').addEventListener('click', alternarPausa);


novaPartida();
mostrarHistoricoAtual();