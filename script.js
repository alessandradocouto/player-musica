const $container = document.querySelector('.container');
const $containerBtn = document.querySelector('.container__btn');
const $btnPrev = document.querySelector('#prev');
const $btnPlay = document.querySelector('#play');
const $btnNext = document.querySelector('#next');
const $audio = document.querySelector('#audio');
const $containerLine = document.querySelector('.container__line');
const $containerProgress = document.querySelector('.container__progress');
const $containerStart = document.querySelector('.container__start');
const $containerEnd = document.querySelector('.container__end');
const $albumTitle = document.querySelector('.album__title');
const $albumText = document.querySelector('.album__text');
const $albumInfo = document.querySelector('.album__info');
const $cover = document.querySelector('.cover');
const $containerSide = document.querySelector('.container__side');
const $aside = document.querySelector('.aside');
const $iconMode = document.querySelector('.icon__mode');
const $iconMenu = document.querySelector('.icon__menu');
const $btnTheme = document.querySelector('.btn__theme');
const $btnPlaylist = document.querySelector('.btn__playlist');

// titulos das musicas igual os nomes das fotos e audios
let music = [
    {name:'Red Hot Chili Peppers - Scar Tissue'},
    {name:'Iron Maiden - Fear of the dark'}, 
    {name:'Cpm 22 - Desconfio'},
    {name: 'Epica - Angel of death'},
    {name: 'Dead Fish - Bem vindo ao clube'},
    {name: 'Blink 182 - Dammit'},
    {name: 'The Neighbourhoods - Daddy issues'},
    {name:'Backstreet Boys - The One'},
    {name:'Backstreet Boys - Get a Boyfriend'},
    {name:'Evanescence - Bring Me To Life'}
]


// indice do array acima
let songIndex = 0;


// funcao que toca a musica com o indice do array

function currentSong(music){
    const [band,song] = music.name.split('-');
    
    $albumTitle.textContent = `${song}`;
    $albumText.textContent = `${band}`;
    audio.src = `assets/music/${music.name}.mp3`; // arquivo audio nessa formatacao
    $cover.src = `assets/image/${music.name}.jpg`; // arquivo img nessa formatacao
    $cover.alt = `${song} - ${band}`;
}

// tocar a música com os botoes correspondente ao tema claro
// ou escuro
function playSong(){
    // add class .play no pai do player
    $btnPlay.classList.add('play');

    // verificar se img tem o atributo src de modo claro
    if ($btnPlay.getAttribute('src') === 'assets/icon/play.svg') {
        $btnPlay.removeAttribute('src', 'assets/icon/play.svg');
        $btnPlay.setAttribute('src', 'assets/icon/pause.svg');
    }

    // verificar se img tem o atributo src de modo escuro
    if ($btnPlay.getAttribute('src') === 'assets/icon/play-dark.svg') {
        $btnPlay.removeAttribute('src', 'assets/icon/play-dark.svg');
        $btnPlay.setAttribute('src', 'assets/icon/pause-dark.svg');
    }
    
    audio.play();
}

// pausa a música e troca a img do botao pra play
function pauseSong(){

    $btnPlay.classList.remove('play');

    if ($btnPlay.getAttribute('src') === 'assets/icon/pause.svg') {
        $btnPlay.setAttribute('src', 'assets/icon/pause.svg');
        $btnPlay.setAttribute('src', 'assets/icon/play.svg');
    }

    if ($btnPlay.getAttribute('src') === 'assets/icon/pause-dark.svg') {
        $btnPlay.setAttribute('src', 'assets/icon/pause-dark.svg');
        $btnPlay.setAttribute('src', 'assets/icon/play-dark.svg');
    }

    audio.pause();
}

// musica anterior
function prevSong(){

    songIndex--;
    
    if(songIndex < 0){
        songIndex = music.length - 1;
    }

    currentSong(music[songIndex]);
    playSong();
}

// proxima musica 
function nextSong(){
    
    songIndex++;
    
    if(songIndex > music.length - 1){
        songIndex = 0;
    }
    
    currentSong(music[songIndex]);
    playSong();
}


// pega a barra que está tocando e 
// vai atualizando conforme o tamanho do width da música
function animationProgress(e){

    // pega o tempo atual da música
    const currentTime = e.target.currentTime;
    // pega a duração total da musica
    const duration = e.target.duration;
    // faz o calculo para achar o percentual de width no momento
    const percentWidth = (currentTime / duration) * 100;
    
    //muda o valor de width da barra de progresso conforme a música vai tocando
    $containerProgress.setAttribute('style',`width:${percentWidth}%`);
}


// clicar e mudar a posição da barra de progresso,
// adiantando a música
function changeProgress(e){
    
    // largura interna incluindo padding,
    // mas exclui borda e scrollbar(barra de rolagem)
    // 197
    const clientWidth = e.target.clientWidth;


    // offsetX retorna a coordenada x do mouse,
    // relativa ao clique no elemento
    // 58  117  195
    const clickX = e.offsetX;
    

    // retorna a duração total da música
    // 248.42022
    const duration = audio.duration;

    // onde quer que clicamos / pela largura
    // multipliando pela duração total da música
    // assim, definimos a música para onde quisermos
    //
    audio.currentTime = (clickX / clientWidth) * duration;
}


// calculo da musica tempo inicial
function startTime(target){

    const start = target.currentTime;
    
    // 6,994938 = 6 seg
    const startInt = Math.floor(start);
    // 00: 09  00: 10  00:11
    const startIntResult = startInt < 10 ? `0${startInt}` : `${startInt}`;
    // 00: 59 00:60
    if(startIntResult < 60){
        // `00:${startIntResult}`;
        $containerStart.textContent = `${'00:' + startIntResult}`;
    }

    if(startIntResult >= 60){
        // 00:70
        // 70 / 60 = 1min
        const secToMinInt = Math.floor(startIntResult / 60);

        // 1m:1s  1m:2s  1m:3s
        const minIntStart = secToMinInt < 10 ? `0${secToMinInt}` : `${secToMinInt}`;

        // 70s % 60 = 10s
        const secRemainder = startIntResult % 60;
        
        // 65s % 60 = 5s
        const secResult = secRemainder < 10 ? `0${secRemainder}` : `${secRemainder}`;
        
        $containerStart.textContent = `${minIntStart + ':' + secResult}`;
    }
}

// calculo da musica tempo final
function endTime(target){

    const total = target.duration;
    
    // 436,994938 / 60 = 7,283248966 min
    const secToMin = (total / 60); 

    // 7 min
    const minResult = Math.floor(secToMin); 
    const minInt = minResult < 10 ? `0${minResult}` : `${minResult}`

    // 0,283248966min * 60 = 16.994937999999973 seg
    const remainderMin = Math.floor((secToMin - minInt) * 60);
    // // Math.floor(16.994937999999973) = 16 seg

    const endSecInt = remainderMin < 10 ? `0${remainderMin}` : `${remainderMin}`;
    // 3:5, sendo que o tmepo correto é 3:05

    if(isNaN(minInt)&& isNaN(endSecInt)){
        $containerEnd.textContent = '00:00';
    }
    else{
        $containerEnd.textContent =  `${minInt}:${endSecInt}`;
    }
}

// refiz do meu jeito
function screenMin(e){

    const eventTarget = e.target;
    startTime(eventTarget);
    endTime(eventTarget);
}


// criação da lista de músicas
function playlist(music){

    music.map(el => {

        const [band, name] = el.name.split('-');
        
        const asideHtml =
        `
        <article class="aside__music">
            <div class="aside__img">
                <img src="assets/image/${el.name}.jpg"  id="aside__cover" alt="${el.name}">
            </div>
            <article class="aside__info">
                <h2 class="aside__title">${name}</h2>
                <p class="aside__text">${band}</p>
            </article>
        </article>`;

        $aside.insertAdjacentHTML('beforeend', asideHtml);

    });
    
}


// identifico o nome da banda e o nome da música e
// comparo com o clique no elemento corresponde, <h2> e <p>
function getTouch(title, text){
    
    // varrer o array de músicas
    music.map((el, index) => {
        
        // desestruturação: o el vai me dar o nome da banda 
        // e o nome da música
        // atraves de uma eliminaçao do hifen e formando um array
        const [band, name] = el.name.split('-');
        // [band,name] = ['Cpm 22','Desconfio']
        
        // pego o nome e indice para passar
        // pra funcao de currentSong(music[index])
        // e toco a musica chamando a funcao playSong()
        if(name === title && band === text){
            songIndex = index;
            currentSong(music[songIndex]);
            playSong();
        };
    });
}

// identifico o nome da banda e o nome da música
function getPlayContainerAside(e){

    const containerTitle = e.target.firstElementChild.textContent;
    const containerText = e.target.lastElementChild.textContent;

    getTouch(containerTitle,containerText);
}

function getPlayContainerTitle(e){

    // h2 = title
    const clickTitle = e.target.firstChild.data; // name
    const clickText = e.target.parentNode.childNodes[3].textContent; // banda
    getTouch(clickTitle, clickText);
}

function getPlayContainerText(e){
    
    // p = text
    const clickText = e.target.firstChild.data; // banda
    const clickTitle = e.target.parentNode.childNodes[1].textContent;
    // console.log(clickText); // undefined ???
    // console.log(clickTitle); // undefined ???
    // console.log(name,band);

    getTouch(clickTitle, clickText);
    
}



// marca música na playlist que está sendo tocada
function playlistMarkup(){

    const $asideTitle = document.querySelectorAll('.aside__title');
    // array com 10 h2.aside__title
    // [ h2.aside__title, h2.aside__title, ... ]

    for(let i = 0; i < $asideTitle.length; i++){
        // comparo o texto de cada h2 com o titulo da música
        if($asideTitle[i].textContent === $albumTitle.textContent){
            // é igual? então add a class playSong(texto rosa no titulo)
            $asideTitle[i].classList.add('playSong');
        }
        else{
            // se não for igual remove class PlaySong
            $asideTitle[i].classList.remove('playSong');
        }
    }
}


// abre ou fecha menu playlist
// colocar em modo acessibilidade
function toggleMenu(){

    $containerSide.classList.toggle('active');

    if( $containerSide.classList.contains('active')){
        $btnPlaylist.setAttribute('aria-expanded', 'true');
        $btnPlaylist.setAttribute('aria-label', 'lista de músicas aberta');
        $albumInfo.classList.add('hidden');
    }
    else{
        $btnPlaylist.removeAttribute('aria-expanded', 'true');
        $btnPlaylist.removeAttribute('aria-label', 'lista de músicas aberta');
        $albumInfo.classList.remove('hidden');
    }

}


// escolher tema dark ou light e guardar no localStorage
function darkLightMode(){

    // a classe é do modo DarkMode(Tema escuro) ou nao
    $container.classList.toggle('darkMode');
    
    // a classe é do modo DarkMode(Tema escuro)
    if($container.classList.contains('darkMode')){
        // mudo o valor do localStorage e coloco true para sinalizar;
        // JSON.stringfy recebe um objeto {dark:'true'} e
        // transforma em uma string
        localStorage.setItem('theme',JSON.stringify({dark: 'true'}));        
    }
    else{
        localStorage.setItem('theme',JSON.stringify({dark: 'false'}));
    }
}

// mudanças nos estilos do css da página
function setTheme(){

    let localTheme;
    // para transformar a string do JSON em 
    // objeto de novo, usamos JSON.parse() e
    // usamos getItem para pegar a chave e o valor do objeto
    
    if(localTheme !== null) {
        localTheme = JSON.parse(localStorage.getItem('theme'));

        // modo escuro ativado
        if(localTheme.dark === 'true'){

            $container.classList.add('darkMode');
            // avisar quando é tema escuro através do aria-label
            $btnTheme.setAttribute('aria-label', 'muda tema do player para claro');
                        
            $albumTitle.style.color = 'white';
            $albumText.style.color = 'rgb(214, 214, 214)';
            $iconMode.src = 'assets/icon/light-mode.svg';
            $iconMode.alt = 'tema escuro';
            $iconMenu.src = 'assets/icon/playlist-light-mode.svg';
            $iconMenu.alt = 'tema escuro';
            $btnPrev.src = 'assets/icon/anterior.svg';
            $btnPlay.src = 'assets/icon/play.svg';
            $btnNext.src = 'assets/icon/proximo.svg';
        }

        // modo escuro está desativado
        if(localTheme.dark === 'false'){

            $container.classList.remove('darkMode');

            // avisar quando é tema claro através do aria-label
            $btnTheme.setAttribute('aria-label', 'muda tema do player para escuro');

            $albumTitle.style.color = 'black';
            $albumText.style.color = 'gray';
            $iconMode.src = 'assets/icon/dark-mode.svg';
            $iconMode.alt = 'tema claro';
            $iconMenu.src = 'assets/icon/playlist-dark-mode.svg';
            $iconMenu.alt = 'tema claro';
            $btnPrev.src = 'assets/icon/anterior-dark.svg';
            $btnPlay.src = 'assets/icon/play-dark.svg';
            $btnNext.src = 'assets/icon/proximo-dark.svg';
        }
    }
}


// Eventos

// click no botão anterior, play, proximo
// uso delegação de eventos( com o e.target)
$containerBtn.addEventListener('click', (e) => {

    e.preventDefault();
    
    // e.target pega o elemento exato que estou clicando,
    // comparo se o nome do id dele é igual ao elemento que quero
    if(e.target.id === 'prev'){
        prevSong();
    }
    
    if(e.target.id === 'play'){

        // se o item tem a class .play então 
        // chamo as funções para pausar pauseSong()
        // ou tocar a música playSong()
        const isPlaying = $btnPlay.classList.contains('play');

        if (audio.pause && !isPlaying) {
            playSong();
        }
        else{
            pauseSong();
        }
    }

    if(e.target.id === 'next'){
        nextSong();
    }
});


// clicar no progesso da barra da música, posso
// arrastar a barra para frente
$containerLine.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.className === 'container__line'){
        
        changeProgress(e);
    }
});


// o evento 'timeupdate'não é um bubble event,
// nao precisamos fazer o click pelo pai

audio.addEventListener('timeupdate',(e) => {
    // enquanto o audio está tocando...
    //calculo o width da barra de progresso(cor rosa)
    animationProgress(e);
    // calculo tempo inicial e final da música
    screenMin(e);
    // qual música está tocando e mostro ao usuário
    playlistMarkup();
});

// no container, no nome da música ou banda
// da playlist e toca a música
$aside.addEventListener('click', (e) => {
    e.preventDefault();

    
    if(e.target.className === 'aside__info')
        getPlayContainerAside(e);

    if(e.target.className === 'aside__title')
         
        getPlayContainerTitle(e);

    if(e.target.className === 'aside__text')

        getPlayContainerText(e);

    // botao voltar remove a playlist ativa e mostra o container principal
    if(e.target.className === 'btn__back' || e.target.className === 'icon__back'){

        $containerSide.classList.remove('active');
        // botao do menu playlist
        $btnPlaylist.setAttribute('aria-expanded', 'false');
        // lista de músicas fechada
        $btnPlaylist.setAttribute('aria-label', 'lista de músicas fechada');
        $albumInfo.classList.remove('hidden');
    }
});


// abrir a playlist e salvar a mudança de tema
$albumInfo.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.className === 'btn__playlist' || e.target.className === 'icon__menu')
        toggleMenu();

    if(e.target.className === 'btn__theme' || e.target.className === 'icon__mode'){
        darkLightMode();
        setTheme();
    }
});


// quando acabar a múscia, toca a proxima música
audio.addEventListener('ended',nextSong);

// a mudanca do tema persiste ao recarregar a página, 
// mas espera a hierarquia do DOM ser totalmente construída
window.addEventListener('DOMContentLoaded', setTheme);




// inicializar as musicas e formar as playlists

currentSong(music[songIndex]);

playlist(music);
