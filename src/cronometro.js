let intervalo = null;
let segundos = 0;
let aoPassarUmSegundo = null;   // a função que recebe cada segundo

// Soma um segundo e avisa.
function passarUmSegundo() {
    segundos = segundos + 1;
    aoPassarUmSegundo(segundos);
}

// formatarTempo(65) → '1:05'
export function formatarTempo(totalDeSegundos) {
    const minutos = Math.floor(totalDeSegundos / 60);
    const resto = totalDeSegundos % 60;
    if (resto < 10) {
        return minutos + ':0' + resto;
    }
    return minutos + ':' + resto;
}

// Começa do zero e, a cada segundo, chama quemAvisar com o total.
export function iniciarCronometro(quemAvisar) {
    pararCronometro();
    segundos = 0;
    aoPassarUmSegundo = quemAvisar;
    aoPassarUmSegundo(segundos);
    intervalo = setInterval(passarUmSegundo, 1000);
}

// Para o relógio e devolve quantos segundos passaram.
export function pararCronometro() {
    clearInterval(intervalo);
    return segundos;
}

// Pausar é parar sem zerar: os segundos continuam guardados.
export function pausarCronometro() {
    clearInterval(intervalo);
}

// Continua de onde parou.
export function continuarCronometro() {
    clearInterval(intervalo);
    intervalo = setInterval(passarUmSegundo, 1000);
}