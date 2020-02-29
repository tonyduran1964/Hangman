var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z'];

var answers;         // Array of topics

var getHint;          // answer getHint
var answer;              // Selected answer
var guess;             // Guess
var guesses = [];      // Stored guess
var lives;             // Lives
var counter;           // Count correct guesses
var space;              // Number of spaces in answer ' '

// Get elements
var showLives = document.getElementById("mylives");

var getHint = document.getElementById("hint");
var showClue = document.getElementById("clue");

// create alphabet ul
var buttons = function () {
  myButtons = document.getElementById('buttons');
  letters = document.createElement('ul');

  for (var i = 0; i < alphabet.length; i++) {
    letters.id = 'alphabet';
    list = document.createElement('li');
    list.id = 'letter';
    list.innerHTML = alphabet[i];
    check();
    myButtons.appendChild(letters);
    letters.appendChild(list);
  }
}

// Create guesses ul
result = function () {
  answerHolder = document.getElementById('hold');
  correct = document.createElement('ul');

  for (var i = 0; i < answer.length; i++) {
    correct.setAttribute('id', 'my-word');
    guess = document.createElement('li');
    guess.setAttribute('class', 'guess');
    if (answer[i] === " ") {
      guess.innerHTML = " ";
      space = 1;
    } else {
      guess.innerHTML = "_";
    }

    guesses.push(guess);
    answerHolder.appendChild(correct);
    correct.appendChild(guess);
  }
}

// Show lives
comments = function () {
  showLives.innerHTML = "Lives: " + lives;
  if (lives < 1) {
    showLives.innerHTML = "Game Over. The answer was: " + answer.toUpperCase();
  }
  for (var i = 0; i < guesses.length; i++) {
    if (counter + space === guesses.length) {
      showLives.innerHTML = "You Win!";
    }
  }
}


// Animate man
var animate = function () {
  var drawMe = lives;
  drawArray[drawMe]();
}


// Hangman
canvas = function () {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext('2d');
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 3;
};

head = function () {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext('2d');
  context.beginPath();
  context.arc(160, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

frame1 = function () {
  draw(0, 150, 350, 150);
};

frame2 = function () {
  draw(10, 0, 10, 600);
};

frame3 = function () {
  draw(10, 5, 170, 5);
};

frame4 = function () {
  draw(160, 5, 160, 15);
};

torso = function () {
  draw(160, 36, 160, 70);
};

rightArm = function () {
  draw(160, 46, 200, 50);
};

leftArm = function () {
  draw(160, 46, 120, 50);
};

rightLeg = function () {
  draw(160, 70, 200, 100);
};

leftLeg = function () {
  draw(160, 70, 120, 100);
};

drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


// OnClick Function
check = function () {
  list.onclick = function () {
    var guess = (this.innerHTML);
    this.setAttribute("class", "active");
    this.onclick = null;
    for (var i = 0; i < answer.length; i++) {
      if (answer[i] === guess) {
        guesses[i].innerHTML = guess;
        counter += 1;
      }
    }
    var j = (answer.indexOf(guess));
    if (j === -1) {
      lives -= 1;
      comments();
      animate();
    } else {
      comments();
    }
  }
}


// Play
play = function () {
  answers = [
    "austin", "pacific ocean", "south america", "arizona", "rhode island", "bison", "ringtail cat",
    "lansing", "rhode island and providence plantantions", "saint louis arch", "asia", "sargasso sea",
    "mcmurdo dry valley", "sudan", "damascus", "alaska", "canada", "austria", "mount everest", "mariana trench"];

  answer = answers[Math.floor(Math.random() * answers.length)];
  answer = answer.replace(/\s/g, " ");
  console.log(answer);
  buttons();

  showClue.innerHTML = "Use the alphabet below to guess the word, or click hint to get a clue.";

  guesses = [];
  lives = 10;
  counter = 0;
  space = 0;
  result();
  comments();

  canvas();
}

play();


// Hint

hint.onclick = function () {

  hint = [
    "What is the capital of Texas?", "What ocean is the largest?", "Where is Brazil?", "What is the state with the capital of Phoenix?", "What state is known as the smallest state?", "What is Oklahoma state animal?", "What is Arizona's state animal?",
    "What is the capital of Michigan?", "What is the full name of Rhode Island?", "What is the gateway to the west?", "What is Earth's largest continent?", "What is the only sea without any coasts?",
    "What is the dryest place on Earth?", "What African nation have the most pyramids?", "What is the oldest city in the world?", "What US state has the most active volcanoes?", "The country with the most coastline is?", "What country is known as kangaroo island?", "What is the tallest mountain in the world?", "What is the deepest point in Earth's ocean?"
  ];

  var answerIndex = answers.indexOf(answer);
  showClue.innerHTML = "Clue: " + hint[answerIndex]
};

// Reset

document.getElementById('reset').onclick = function () {
  correct.parentNode.removeChild(correct);
  letters.parentNode.removeChild(letters);
  context.clearRect(0, 0, 400, 400);
  play();
}
