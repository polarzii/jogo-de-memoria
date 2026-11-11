const CHAVE_RECORDE = 'memoria-recorde';

// carregarRecorde() → null, enquanto ninguém terminou uma partida
export function carregarRecorde() {
    const salvo = localStorage.getItem(CHAVE_RECORDE);
    if (salvo === null) {
        return null;
    }
    return Number(salvo);
}

// Só salva se for o primeiro tempo ou se for menor que o recorde.
// Devolve true quando o tempo é um recorde novo.
export function registrarTempo(totalDeSegundos) {
    const recorde = carregarRecorde();
    if (recorde !== null && totalDeSegundos >= recorde) {
        return false;
    }
    localStorage.setItem(CHAVE_RECORDE, totalDeSegundos);
    return true;
}