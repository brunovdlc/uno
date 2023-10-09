var cartaMaquina;
var cartaJogador;
var pontosJogador = 0;
var pontosMaquina = 0;
var deck = [];
var frenteDaCarta1;
var frenteDaCarta2;
var flipCardAudio = document.querySelector("#flipCard");
var winAudio = document.querySelector("#win");
var loseAudio = document.querySelector("#lose");
for (var i = 0; i < cartas.length; i++) {if (window.CP.shouldStopExecution(0)) break;
  deck.push(cartas[i]);
}window.CP.exitedLoop(0);
var state = 0;
var flipCard1 = document.querySelector(".flip-card1");
var flipCard2 = document.querySelector(".flip-card2");
var flipCardInner1 = document.querySelector(".flip-card-inner1");
var flipCardInner2 = document.querySelector(".flip-card-inner2");
var cartasNoDeck = (".cards");
updateDeck();

function sortearCarta() {
  var numeroCartaMaquina = parseInt(Math.random() * deck.length);
  cartaMaquina = deck[numeroCartaMaquina];
  deck.splice(numeroCartaMaquina, 1);

  var numeroCartajogador = parseInt(Math.random() * deck.length);
  cartaJogador = deck[numeroCartajogador];
  deck.splice(numeroCartajogador, 1);

  document.querySelector('.sortear').style.display = "none";

  updateDeck();
  updateData();
  exibirOpcoes();


}

function updateDeck() {
  var cartasNoBaralho = deck.length;
  cartasNoDeck.innerText = cartasNoBaralho;
}

function updateData() {
  var nomeCard1 = document.querySelector(".frontCardTitulo1");
  var nomeCard2 = document.querySelector(".frontCardTitulo2");
  var imgCard1 = document.querySelector(".frontCardImage1");
  var imgCard2 = document.querySelector(".frontCardImage2");
  var fofoca1 = document.querySelector(".fofoca1");
  var inveja1 = document.querySelector(".inveja1");
  var beleza1 = document.querySelector(".beleza1");
  var talaricagem1 = document.querySelector(".talaricagem1");
  var fofoca2 = document.querySelector(".fofoca2");
  var inveja2 = document.querySelector(".inveja2");
  var beleza2 = document.querySelector(".beleza2");
  var talaricagem2 = document.querySelector(".talaricagem2");

  nomeCard1.innerText = cartaJogador.nome;
  imgCard1.src = cartaJogador.url;
  fofoca1.innerText = cartaJogador.atributos.fofoca;
  inveja1.innerText = cartaJogador.atributos.inveja;
  beleza1.innerText = cartaJogador.atributos.beleza;
  talaricagem1.innerText = cartaJogador.atributos.talaricagem;

  nomeCard2.innerText = cartaMaquina.nome;
  imgCard2.src = cartaMaquina.url;
  fofoca2.innerText = cartaMaquina.atributos.fofoca;
  inveja2.innerText = cartaMaquina.atributos.inveja;
  beleza2.innerText = cartaMaquina.atributos.beleza;
  talaricagem2.innerText = cartaMaquina.atributos.talaricagem;

  flipCard1.classList.add("pulse");
  flipCardInner1.style.transform = "rotateY(180deg)";
  flipCardAudio.play();
  state = 0;

  frenteDaCarta1 = document.querySelector(".flip-card-inner-front1");
  frenteDaCarta2 = document.querySelector(".flip-card-inner-front2");

  if (cartaJogador.numero == 11) {
    frenteDaCarta1.classList.add("brilhante");
  } else if (cartaMaquina.numero == 11) {
    frenteDaCarta2.classList.add("brilhante");
  } else if (cartaJogador.numero != 11 && cartaMaquina.numero != 11) {
    frenteDaCarta1.classList.remove("brilhante");
    frenteDaCarta2.classList.remove("brilhante");
  }

if (cartaJogador.numero == 11) {
    frenteDaCarta1.classList.add("brilhante");
  } else if (cartaMaquina.numero == 11) {
    frenteDaCarta2.classList.add("brilhante");
  } else if (cartaJogador.numero != 11 && cartaMaquina.numero != 11) {
    frenteDaCarta1.classList.remove("brilhante");
    frenteDaCarta2.classList.remove("brilhante");
  }

}

function exibirOpcoes() {
  var opcoes = document.querySelector(".options");
  var opcoesTexto = "";
  for (var atributo in cartaJogador.atributos) {
    opcoesTexto += `<button id="btn${atributo}" class="btnatributo">${atributo}</button>`;
  }

  var template = `<p>Que atributo você deseja comparar?</p><br>
   ${opcoesTexto}`;
  opcoes.innerHTML = template;
  adicionarEventos();
}

function adicionarEventos() {
  var btns = document.querySelectorAll(".btnatributo");
  btns.forEach(button => {
    button.addEventListener("click", () => {
      obtemAtributoSelecionado(button.innerText);
    });
  });
}

function obtemAtributoSelecionado(atributo) {
  jogar(atributo);
}

function jogar(atributoSelecionado) {
  var placarJogador = document.querySelector("#placarJogador");
  var placarMaquina = document.querySelector("#placarMaquina");

  if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
    mostraResultado("Você venceu!");
    pontosJogador++;
    placarJogador.innerText = pontosJogador;
    winAudio.play();
  } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
    mostraResultado("Você perdeu!");
    pontosMaquina++;
    placarMaquina.innerText = pontosMaquina;
    loseAudio.play();
  } else {
    mostraResultado("Empatou!");
  }

  if (state == 0) {
    flipCard2.classList.add("pulse");
    flipCardInner2.style.transform = "rotateY(180deg)";
    flipCardAudio.play();
    state = 1;
  }
}

function mostraResultado(msg) {
  var resultado = document.querySelector(".comandos");
  var template = `<h1>${msg}</h1><br><button class="jogarNovamente">Jogar Novamente</button>`;
  resultado.innerHTML = template;
  var jogarNovamente = document.querySelector(".jogarNovamente");
  jogarNovamente.addEventListener("click", proximoRound);
}

function proximoRound() {
  winAudio.load();
  loseAudio.load();
  if (deck.length != 0) {
    flipCardInner1.style.transform = "rotateY(0deg)";
    flipCardInner2.style.transform = "rotateY(0deg)";
    flipCard1.classList.remove("pulse");
    flipCard2.classList.remove("pulse");
    state = 0;

    var comandos = document.querySelector(".comandos");
    var template = `<button class="sortear" onclick="sortearCarta()">Sortear carta</button>
            <div class="options"></div>
            `;

    setTimeout(() => {
      comandos.innerHTML = template;
    }, 500);
  } else {
    updateDeck();
    var split = document.querySelector(".split");
    var vencedor;
    if (pontosJogador > pontosMaquina) {
      vencedor = "Uhul! Você venceu o jogo!";
    } else if (pontosJogador < pontosMaquina) {
      vencedor = "Que pena. O VTO venceu o jogo!";
    } else {
      vencedor = "O jogo empatou!";
    }
    var template = `
      <div class="msgFinal">
      <h1 class="msgGrande">${vencedor}</h1>
      <h1 class="msg">Acabaram as Cartas!</h1>
      <button class="novoJogo">Novo jogo!</button>
      </div>`;
    split.innerHTML = template;

    var novoJogo = document.querySelector(".novoJogo");
    novoJogo.addEventListener("click", iniciarNovoJogo);
  }
}

function iniciarNovoJogo() {
  pontosMaquina = 0;
  pontosJogador = 0;
  placarJogador.innerText = pontosJogador;
  placarMaquina.innerText = pontosMaquina;


  for (var i = 0; i < cartas.length; i++) {if (window.CP.shouldStopExecution(1)) break;
    deck.push(cartas[i]);
  }window.CP.exitedLoop(1);

  updateDeck();
  var split = document.querySelector(".split");
  var template = `
   
`;

  split.innerHTML = template;
  flipCard1 = document.querySelector(".flip-card1");
  flipCard2 = document.querySelector(".flip-card2");
  flipCardInner1 = document.querySelector(".flip-card-inner1");
  flipCardInner2 = document.querySelector(".flip-card-inner2");
}

// Itera sobre a array cartas
for (var i = 0; i < cartas.length; i++) {
  // Obtém o objeto de atributos da carta atual
  var atributos = cartas[i].atributos;

  // Itera sobre os atributos e adiciona "%" ao final do valor
  for (var chave in atributos) {
    // Atributos variam de 0 a 100, então é necessário adicionar o "%" ao final
    atributos[chave] = atributos[chave] + "%";
  }
}

// Agora, os atributos na array cartas têm "%" no final de cada número
console.log(cartas);

// Função para gerar números aleatórios entre min e max (incluindo min e excluindo max)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Percorrer o array cartas e atualizar os atributos aleatoriamente
for (let i = 0; i < cartas.length; i++) {
    // Atributos variam de 0 a 100
    cartas[i].atributos.fofoca = getRandomInt(0, 100) + "%";
    cartas[i].atributos.inveja = getRandomInt(0, 100) + "%";
    cartas[i].atributos.beleza = getRandomInt(0, 100) + "%";
    cartas[i].atributos.talaricagem = getRandomInt(0, 100) + "%";
}

// Verificar se os atributos foram atualizados com a porcentagem
console.log(cartas);
