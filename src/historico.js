const CHAVE_HISTORICO = 'memoria-historico';
const MAXIMO_DE_PARTIDAS = 5;

// carregarHistorico() → [], enquanto ninguém terminou uma partida.
// A partida mais recente vem primeiro.
export function carregarHistorico() {
    const salvo = localStorage.getItem(CHAVE_HISTORICO);
    if (salvo === null) {
        return [];
    }
    return JSON.parse(salvo);
}

// Coloca a partida no começo da lista e guarda só as últimas cinco.
export function registrarPartida(partida) {
    const lista = [partida].concat(carregarHistorico());
    const ultimas = lista.filter((item, posicao) => posicao < MAXIMO_DE_PARTIDAS);
    localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(ultimas));
}

// formatarData('2026-11-09T19:42:00.000Z') → '09/11, 16:42'
// (o horário sai no fuso do computador)
export function formatarData(textoDaData) {
    return new Date(textoDaData).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}