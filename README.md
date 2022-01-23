# Player de música com HTML, CSS e Javascript
 
 ![apresentação do projeto](projeto-criado.png)

## Projeto

Através do HTML5 Audio API, desenvolvi uma aplicação de player de música com recursos como lista das músicas, tema escuro/claro com uso de localStorage e aviso ao usuário de qual música está sendo tocada no momento. 

## Tecnologias

Uso de Javascript Puro(Vanilla JS), de Flexbox para obter responsividade, técnica de acessibilidade utilizando aria-label, aria-controls, aria-expanded nos botões, além de utilizarmos o evento de DOMContentLoaded e localStorage para guardar a escolha do usuário por tema escuro/claro do usuário.

## Prototipagem com Figma

Nesse [link](https://www.figma.com/file/86FIiUJdrxZm5DdHI2Wl3J/Player-Musica?node-id=0%3A1 "Layout no Figma") você visualiza o projeto de Layout no Figma. 

### O que aprendi com esse projeto?


```javascript


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


// o evento 'timeupdate'não é um bubble event,nao precisamos fazer o click pelo parente(pai)

audio.addEventListener('timeupdate',(e) => {
    // enquanto o audio está tocando...
    //calculo o width da barra de progresso(cor rosa)
    animationProgress(e);
    // calculo tempo inicial e final da música
    screenMin(e);
    // qual música está tocando e mostro ao usuário
    playlistMarkup();
});

```


### Live do projeto
player rodando projeto Github



