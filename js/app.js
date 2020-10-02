'use strict';

var answerInput = [];
var Game = function (numberOfGame) {
  this.answerArray = [];
  this.level = 1;
  this.numberOfGame = numberOfGame
}
var int = 3
var game = new Game(int);

function checkAnswer() {
  for (var i = 0; i < answerInput.length; i++) {
    if (answerInput[i] !== game.answerArray[i]) {
      game.numberOfGame--;
      var again = document.getElementById('h1');
      again.textContent = `Try again! You have ${game.numberOfGame} tries left.`;
      if (game.numberOfGame === 0) {
        return gameOver(int);
      }
      // fuction that will make the user to try again
      return tryAgain();
    }
  }
  if (answerInput.length === game.answerArray.length) {
  var Congratulations = document.getElementById('h1');
  Congratulations.textContent = `Excellent!`; 
    setTimeout(() => {
      nextLevel();
      play();  
    }, 800);
  }
}

function tryAgain() {
  answerInput = [];
}

function nextLevel() {
  game.level += 1;
  answerInput = [];
  var Congratulations = document.getElementById('h1');
  Congratulations.textContent = `level ${game.level}`;
}

function gameOver(int) {
  flicker('body', 'game-over', 'sounds/wrong.mp3');
  var result = document.getElementById('h1');
  result.textContent = `Game over... your max level was ${game.level} `;
  game.answerArray = [];
  game.level = 1;
  game.numberOfGame = int;
  play();

}

var boxes = ['blue', 'green', 'red', 'yellow'];
function play() {
  // this is where the game start...
  var boxNumber = Math.floor(Math.random() * 4) + 1;
  console.log(boxNumber);
  game.answerArray.push(boxNumber);
  flicker('box-' + boxNumber, 'test', 'sounds/' + boxes[boxNumber - 1] + ".mp3");
  answerInput = [];
}


function clickedInput() {
  // this is where I wanna push the use answer but i do not know how to do that using teh boxes that I just rendered
  var box = this;
  var boxNumber = parseInt(box.id.slice(-1));
  console.log(boxNumber);
  answerInput.push(boxNumber);
  flicker(box.id, 'answer', 'sounds/' + boxes[boxNumber - 1] + ".mp3");
  checkAnswer();

}





// render boxes
function renderbox() {
  // I Dont know why the browser is telling me that I have an issu with this part of my code 
  var divEl = document.getElementById('boxes');
  var divEl1 = document.createElement('Button');
  divEl1.setAttribute('id', 'box-1');
  divEl1.setAttribute('class', 'box')
  divEl.appendChild(divEl1);
  var divEl2 = document.createElement('Button');
  divEl2.setAttribute('id', 'box-2');
  divEl2.setAttribute('class', 'box')
  divEl.appendChild(divEl2);
  var divEl3 = document.createElement('Button');
  divEl3.setAttribute('id', 'box-3');
  divEl3.setAttribute('class', 'box')
  divEl.appendChild(divEl3);
  var divEl4 = document.createElement('Button');
  divEl4.setAttribute('id', 'box-4');
  divEl4.setAttribute('class', 'box')
  divEl.appendChild(divEl4);
}

var gameStarted = false; 

function startGame(e) {
  if(!gameStarted){
    gameStarted = true;
    play();
  }
}
renderbox()
document.addEventListener('keydown', startGame);

//create teh event Listener
var clickedOnTheBox = document.getElementsByClassName('box'); // because I used getElementByClasName, it will return an array of all the tag that has "box" as a class Name.

// this will guve you ony the value of that array (what's inside of the array)
var clickedOnTheBoxValue = Object.keys(clickedOnTheBox);

clickedOnTheBoxValue.forEach(
  i => {
    // that will point every signle index that you cliked on
    clickedOnTheBox[i].addEventListener('click', clickedInput);
  }
)
function flicker(id, className, sound) {
  document.getElementById(id).classList.add(className);
  setTimeout(function () {
    document.getElementById(id).classList.remove(className);
  }, 200);

  var audio = new Audio(sound);
  audio.play();
}