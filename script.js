const barraMenu = document.getElementById('tab')
const buttonFoco = document.getElementById('foco')
const buttonPausa = document.getElementById('pausa')
const buttonDescanso = document.getElementById('descanso')
const htmlBody = document.body
const timer = document.getElementById('timer')
let minutosEmSegundos = 1500
let minutosDoModo = 1500
let timerFuncionando = false
let contagem
const buttonReset = document.getElementById('button-reset')
const buttonPlay = document.getElementById('button-play')
const imgButtonPlay = document.getElementById('img-botao-play')
const buttonPassarModo = document.getElementById('button-forward')
const musicaFundo = new Audio('sounds/Transcendence.mp3')
const somClick = new Audio('sounds/Click.mp3')
const musicaFimTempo = new Audio('sounds/Ringtone.mp3')
let musicaTocando = false
const buttonMusica = document.getElementById('buttonmusica')
const spanMusica = document.getElementById('spanmusica')
const labelMusica = document.getElementById('label-musica')

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
            musicaFimTempo.play()
            clearInterval(contagem)
            timerFuncionando = false
            resetarTimer(minutosDoModo)
            alert('Tempo esgotado!')
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
    imgButtonPlay.setAttribute('src', 'icons/play-fill.svg') 
}

function trocarModo(modo) {
    removerOutrosModos()
    htmlBody.classList.add(`modo-${modo}`)
    if (modo == 'pausa') {
        buttonPausa.classList.add('active-tab')
        timer.textContent = "05:00"
        minutosEmSegundos = 300
        minutosDoModo = 300
    } else if (modo == 'foco') {
        buttonFoco.classList.add('active-tab')
        minutosEmSegundos = 1500
        minutosDoModo = 1500
        timer.textContent = "25:00"
    } else {
        buttonDescanso.classList.add('active-tab')
        minutosEmSegundos = 900
        minutosDoModo = 900
        timer.textContent = "15:00"
    }
    resetarTimer(minutosEmSegundos)
    imgButtonPlay.setAttribute('src', 'icons/play-fill.svg')
}

function tocarMusica() {
    somClick.play()
    if (!musicaTocando) {
        musicaFundo.play()
        buttonMusica.classList.add('button-musica-active')
        spanMusica.classList.add('span-active')
        musicaTocando = true
    } else {
        musicaFundo.pause()
        buttonMusica.classList.remove('button-musica-active')
        spanMusica.classList.remove('span-active')
        musicaTocando = false
    }
}

buttonFoco.addEventListener('click', () => {
    trocarModo('foco')
})

buttonPausa.addEventListener('click', () => {
    trocarModo('pausa')
})

buttonDescanso.addEventListener('click', () => {
    trocarModo('descanso')
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
    if (htmlBody.classList.contains('modo-foco')) {
        resetarTimer(1500)
    } else if (htmlBody.classList.contains('modo-pausa')) {
        resetarTimer(300)
    } else {
        resetarTimer(900)
    }   
})

buttonPassarModo.addEventListener('click', () => {
    if (htmlBody.classList.contains('modo-foco')) {
        trocarModo('pausa')
    } else if (htmlBody.classList.contains('modo-pausa')) {
        trocarModo('descanso')
    } else {
        trocarModo('foco')
    }       
})

labelMusica.addEventListener('click', () => {
    tocarMusica()
})