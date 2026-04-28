const barraMenu = document.getElementById('tab')
const buttonFoco = document.getElementById('foco')
const buttonPausa = document.getElementById('pausa')
const buttonDescanso = document.getElementById('descanso')
const htmlBody = document.body
const timer = document.getElementById('timer')
let minutosEmSegundos = 1500
let timerFuncionando = false
let contagem
const buttonReset = document.getElementById('button-reset')
const buttonPlay = document.getElementById('button-play')
const imgButtonPlay = document.getElementById('img-botao-play')

function removerOutrosModos() {
    htmlBody.classList.remove('modo-foco', 'modo-pausa', 'modo-descanso')
    buttonFoco.classList.remove('active-tab')
    buttonPausa.classList.remove('active-tab')
    buttonDescanso.classList.remove('active-tab')
}

function formatarTempo(segundos) {
    const m = String(Math.floor(segundos / 60)).padStart(2, '0');
    const s = String(segundos % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function atualizarDisplay() {
    timer.textContent = formatarTempo(minutosEmSegundos)
}

function começarTimer(tempoQueFalta) {
    if (timerFuncionando) return
    minutosEmSegundos = tempoQueFalta
    atualizarDisplay()
    timerFuncionando = true
    contagem = setInterval(() => {
        minutosEmSegundos --
        atualizarDisplay()
        if (minutosEmSegundos <= 0) {
            clearInterval(contagem)
            timerFuncionando = false
        }
    }, 1000);
}

function pausarTimer() {
    if (!timerFuncionando) return
    clearInterval(contagem)
    timerFuncionando = false
}

function resetarTimer(tempoAtual) {
    clearInterval(contagem)
    timerFuncionando = false
    minutosEmSegundos = tempoAtual
    atualizarDisplay()
}


buttonFoco.addEventListener('click', () => {
    removerOutrosModos()
    htmlBody.classList.add('modo-foco')
    buttonFoco.classList.add('active-tab')
    minutosEmSegundos = 1500
    timer.textContent = "25:00"
    resetarTimer(minutosEmSegundos)
    imgButtonPlay.setAttribute('src', 'icons/play-fill.svg')
})

buttonPausa.addEventListener('click', () => {
    removerOutrosModos()
    htmlBody.classList.add('modo-pausa')
    buttonPausa.classList.add('active-tab')
    minutosEmSegundos = 300
    timer.textContent = "05:00"
    resetarTimer(minutosEmSegundos)
    imgButtonPlay.setAttribute('src', 'icons/play-fill.svg')
})

buttonDescanso.addEventListener('click', () => {
    removerOutrosModos()
    htmlBody.classList.add('modo-descanso')
    buttonDescanso.classList.add('active-tab')
    minutosEmSegundos = 900
    timer.textContent = "15:00"
    resetarTimer(minutosEmSegundos)
    imgButtonPlay.setAttribute('src', 'icons/play-fill.svg')
})

buttonPlay.addEventListener('click', () => {
    if (!timerFuncionando) {
        começarTimer(minutosEmSegundos)
        imgButtonPlay.setAttribute('src', 'icons/pause-fill.svg')
    } else {
        pausarTimer()
        imgButtonPlay.setAttribute('src', 'icons/play-fill.svg')
    }
})

buttonReset.addEventListener('click', () => {
    resetarTimer(minutosEmSegundos)
    imgButtonPlay.setAttribute('src', 'icons/play-fill.svg')    
})