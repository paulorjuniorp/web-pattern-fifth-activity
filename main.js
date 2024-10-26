const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const startPauseBt = document.querySelector("#start-pause");
const audioPlay = new Audio('sons/play.wav');
const audioParar = new Audio('sons/pause.mp3');
const audioFim = new Audio('sons/beep.mp3');
const iniciarPausarBt = document.querySelector('#start-pause span');
const iconePlayPauseBtn = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');


let tempoDecorridoEmSegundos = 1500;

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
    
})


function alterarContexto(contexto){
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src',`/imagens/${contexto}.png`);
    mostrarTempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    })

    switch(contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade.
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar para à superficie.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default :
            break;
        
    }
}

const contagemRegressiva = () => {
    tempoDecorridoEmSegundos -= 1;
    if(tempoDecorridoEmSegundos <= 0) {
        audioFim.play();
        alert('Tempo esgotado');
        parar();
        return;
    }
    mostrarTempo();
    console.log('Temporizador = ' + tempoDecorridoEmSegundos)
}

let intervaloId = null;

function iniciarOuPausar() {
    if(intervaloId) {
        audioParar.play();
        parar();
        return;
    }
    audioPlay.play();
    iniciarPausarBt.textContent = 'Pausar';
    iconePlayPauseBtn.setAttribute('src','/imagens/pause.png');
    intervaloId = setInterval(contagemRegressiva, 1000);
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function parar() {
    iconePlayPauseBtn.setAttribute('src','/imagens/play_arrow.png');
    iniciarPausarBt.textContent = 'Começar';
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR',{minute: '2-digit', second: '2-digit'})

    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();