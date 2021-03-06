const $container = document.querySelector('.container');
const $containerBtn = document.querySelector('.container__btn');
const $btnContainer = document.querySelectorAll('.btn');
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
const $asideMusic = document.querySelector('.aside__music');
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

// tocar a m??sica com os botoes correspondente ao tema claro
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

// pausa a m??sica e troca a img do botao pra play
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


// pega a barra que est?? tocando e 
// vai atualizando conforme o tamanho do width da m??sica
function animationProgress(e){

    // pega o tempo atual da m??sica
    const currentTime = e.target.currentTime;
    // pega a dura????o total da musica
    const duration = e.target.duration;
    // faz o calculo para achar o percentual de width no momento
    const percentWidth = (currentTime / duration) * 100;
    
    //muda o valor de width da barra de progresso conforme a m??sica vai tocando
    $containerProgress.setAttribute('style',`width:${percentWidth}%`);
}


// clicar e mudar a posi????o da barra de progresso,
// adiantando a m??sica
function changeProgress(e){
    
    // largura interna incluindo padding,
    // mas exclui borda e scrollbar(barra de rolagem)
    // 197
    const clientWidth = e.target.clientWidth;


    // offsetX retorna a coordenada x do mouse,
    // relativa ao clique no elemento
    // 58  117  195
    const clickX = e.offsetX;
    

    // retorna a dura????o total da m??sica
    // 248.42022
    const duration = audio.duration;

    // onde quer que clicamos / pela largura
    // multipliando pela dura????o total da m??sica
    // assim, definimos a m??sica para onde quisermos
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
    // 3:5, sendo que o tmepo correto ?? 3:05

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


// cria????o da lista de m??sicas
function playlist(music){

    music.map(el => {

        const [band, name] = el.name.split('-');
        
        const asideHtml =
        `
        <article class="aside__music">
            <div class="aside__img">
                <img src="assets/image/${el.name}.jpg"  id="aside__cover" alt="${el.name}">
            </div>
            <button class="aside__link" type="button">
                <article class="aside__info">
                    <h2 class="aside__title">${name}</h2>
                    <p class="aside__text">${band}</p>
                </article>
            </button>
        </article>`;

        $aside.insertAdjacentHTML('beforeend', asideHtml);

    });
    
}


// identifico o nome da banda e o nome da m??sica e
// comparo com o clique no elemento corresponde, <h2> e <p>
function getTouch(title, text){
    
    // varrer o array de m??sicas

    music.filter( (el, index) => {

        // desestrutura????o: o el traz nome da musica e banda 
        // split faz elimina??ao do hifen e forma um array
        const [band, song] = el.name.split(' - ');
        // a desestruturacao acima nao funciona com o uso 
        //do tab, para contornar esse problema faremos 2 tipos de desestruturacao
        const [b, s] = el.name.split('-');

        // pego o nome e indice para passar
        // pra funcao de currentSong(music[index])
        // e toco a musica chamando a funcao playSong()
        if( (text===band && title === song) || (text===b && title===s) ){
            songIndex = index;
            currentSong(music[songIndex]);
            playSong();
        }

    });
}


// identifico o nome da banda e o nome da m??sica
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



// marca m??sica na playlist que est?? sendo tocada
function playlistMarkup(){

    const $asideTitle = document.querySelectorAll('.aside__title');
    // array com 10 h2.aside__title
    // [ h2.aside__title, h2.aside__title, ... ]

    for(let i = 0; i < $asideTitle.length; i++){
        // comparo o texto de cada h2 com o titulo da m??sica
        if($asideTitle[i].textContent === $albumTitle.textContent){
            // ?? igual? ent??o add a class playSong(texto rosa no titulo)
            $asideTitle[i].classList.add('playSong');
        }
        else{
            // se n??o for igual remove class PlaySong
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
        $btnPlaylist.setAttribute('aria-label', 'lista de m??sicas aberta');
        $albumInfo.classList.add('hidden');
    }
    else{
        $btnPlaylist.removeAttribute('aria-expanded', 'true');
        $btnPlaylist.removeAttribute('aria-label', 'lista de m??sicas aberta');
        $albumInfo.classList.remove('hidden');
    }

}


// escolher tema dark ou light e guardar no localStorage
function darkLightMode(){

    // a classe ?? do modo DarkMode(Tema escuro) ou nao
    $container.classList.toggle('darkMode');
    
    // a classe ?? do modo DarkMode(Tema escuro)
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

// mudan??as nos estilos do css da p??gina
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
            // avisar quando ?? tema escuro atrav??s do aria-label
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

        // modo escuro est?? desativado
        if(localTheme.dark === 'false'){

            $container.classList.remove('darkMode');

            // avisar quando ?? tema claro atrav??s do aria-label
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

// click no bot??o anterior, play, proximo
// uso delega????o de eventos( com o e.target)
$containerBtn.addEventListener('click', (e) => {

    e.preventDefault();
    
    // e.target pega o elemento exato que estou clicando,
    // comparo se o nome do id dele ?? igual ao elemento que quero
    if(e.target.id === 'prev'){
        prevSong();
    }
    
    if(e.target.id === 'play'){

        // se o item tem a class .play ent??o 
        // chamo as fun????es para pausar pauseSong()
        // ou tocar a m??sica playSong()
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


// acessibilidade, uso do teclado
// quando o usuario apertar 'enter'(13)
// botao de prev, play, next far?? suas fun????es
// se a m??sica tiver tocando, ela pausa
$btnContainer.forEach(el => {

    el.addEventListener('keydown', (e) => {
        
        if(e.keyCode === 13){
            
            if(e.target.firstElementChild.id === 'prev')
                prevSong();

            if(e.target.firstElementChild.id === 'play' ){

                if(e.target.firstElementChild.classList.contains('play')){
                    pauseSong();
                }
                else{
                    playSong();
                }
            }

            if(e.target.firstElementChild.id === 'next')
                nextSong();
        }

        e.stopPropagation();
    });
});



// clicar no progesso da barra da m??sica, posso
// arrastar a barra para frente
$containerLine.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.className === 'container__line'){
        
        changeProgress(e);
    }
});


// o evento 'timeupdate'n??o ?? um bubble event,
// nao precisamos fazer o click pelo pai

audio.addEventListener('timeupdate',(e) => {
    // enquanto o audio est?? tocando...
    //calculo o width da barra de progresso(cor rosa)
    animationProgress(e);
    // calculo tempo inicial e final da m??sica
    screenMin(e);
    // qual m??sica est?? tocando e mostro ao usu??rio
    playlistMarkup();
});

// no container, no nome da m??sica ou banda
// da playlist e toca a m??sica
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
        // lista de m??sicas fechada
        $btnPlaylist.setAttribute('aria-label', 'lista de m??sicas fechada');
        $albumInfo.classList.remove('hidden');
    }
});





// abrir a playlist e salvar a mudan??a de tema
$albumInfo.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.className === 'btn__playlist' || e.target.className === 'icon__menu')
        toggleMenu();

    if(e.target.className === 'btn__theme' || e.target.className === 'icon__mode'){
        darkLightMode();
        setTheme();
    }
});


// torna acessivel escolher as musicas da playlist
// com o tab e enter do teclado
$aside.addEventListener('keypress', (e) => {
    
    if(e.key === 'Enter'){
        if(e.target.className === 'aside__link'){
            const title = e.target.innerText.split('\n');
            const [song, space, band] = title;
            getTouch(song, band);
            playlistMarkup(e);        
        }
    }
});


// quando acabar a m??scia, toca a proxima m??sica
audio.addEventListener('ended',nextSong);

// a mudanca do tema persiste ao recarregar a p??gina, 
// mas espera a hierarquia do DOM ser totalmente constru??da
window.addEventListener('DOMContentLoaded', setTheme);




// inicializar as musicas e formar as playlists

currentSong(music[songIndex]);

playlist(music);
