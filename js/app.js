/*
 * Create a list that holds all of your cards
 */

let cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

let stars = ["fa-star", "fa-star", "fa-star"];

let moveCounter = 0;
let moves = document.querySelector(".moves");
let messageContent = document.querySelector(".winner");
let matchCounter = 0;
let restart = document.querySelector(".restart");
let time = 0;
let timerOn = false;
let deck = document.querySelector(".deck");
let score = document.querySelector(".stars");

let starHTML = stars.map(function(star) {
  return generateStar(star);
});

function initGame() {
  deck;
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });

  score.innerHTML = starHTML.join(" ");
  deck.innerHTML = cardHTML.join(" ");
  moves.innerText = 0;
  timerOn;
}

initGame();

let allCards = document.querySelectorAll(".card");
let openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

function generateStar(star) {
  return `<li><i class="fa ${star}"></i></li>`;
}

// start timer
deck.addEventListener("click", triggerTime);

function triggerTime() {
  let timerOn = true;
  timeMe = setInterval(setTime, 1000);
  deck.removeEventListener("click", triggerTime);
}

function setTime() {
  if ((timerOn = true)) {
    let t = time++;
    document.getElementById("timer").innerHTML = t;
  } else {
    clearInterval(timeMe);
    console.log("should be cleared");
  }
}

// restarting the game
restart.addEventListener("click", function(e) {
  deck;
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });

  score.innerHTML = starHTML.join(" ");
  deck.innerHTML = cardHTML.join(" ");
  moves.innerText = 0;
  moveCounter = 0;
  matchCounter = 0;
  time = 0;
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Modal Popup Logic
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// set score
function setScore() {
  if (moveCounter > 16) {
    stars = ["fa-star"];
  } else if (moveCounter >= 11 && moveCounter <= 16) {
    stars = ["fa-star", "fa-star"];
  } else {
    stars = ["fa-star", "fa-star", "fa-star"];
  }
  let starHTML = stars.map(function(star) {
    return generateStar(star);
  });
  score.innerHTML = starHTML.join(" ");
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

allCards.forEach(function(card) {
  card.addEventListener("click", function(e) {
    if (
      !card.classList.contains("open") &&
      !card.classList.contains("show") &&
      !card.classList.contains("match")
    ) {
      // flip cards over
      openCards.push(card);
      card.classList.add("open", "show");
      console.log("Open Cards:", openCards.length);

      // Unmatched cards flip back
      if (openCards.length == 2) {
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add("match");
          openCards[0].classList.add("open");
          openCards[0].classList.add("show");

          openCards[1].classList.add("match");
          openCards[1].classList.add("open");
          openCards[1].classList.add("show");

          matchCounter++;
          setScore();
          openCards = [];
        } else {
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove("open", "show");
            });
            openCards = [];
          }, 1000);
        }
        moveCounter++;
        setScore();
        if (matchCounter == 8) {
          clearInterval(timeMe);
          modal.style.display = "block";
        }
      }
      moves.innerText = moveCounter;
      messageContent.innerText = `Congratulations!
      You won in ${moveCounter} moves.
      Final Time: ${time} seconds`;
    }
  });
});
