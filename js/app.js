/*
 * Create a list that holds all of your cards
 */

//gather all the variables of the game into an object
const memorygame = {
  icons: ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"],

  opencards: [], //variable to store the 2 card clicks.

  cardcount: [], //variable that holds all the crads clicked

  moves: 0,

  //timer function inspiration from  https://stackoverflow.com/questions/31559469/how-to-create-a-simple-javascript-timer
  timer() {
    var sec = 0;
    var timer = setInterval(function() {
      document.getElementById("gameTimer").innerHTML = sec + " seconds";
      sec++;
      if (memorygame.cardcount === 16) {
        clearInterval(timer());
      }
    }, 1000);
  },

  rating() {
    let star = document.querySelector(".stars");
    if (memorygame.moves === 10) {
      star.firstElementChild.remove();
    } else if (memorygame.moves === 20) {
      star.firstElementChild.remove();
    } else if (memorygame.moves === 26) {
      star.firstElementChild.remove();
    }
  },

  //function that triger when 2 cards are no match
  closecards(card1, card2) {
    card1.classList.remove("open", "show");
    card2.classList.remove("open", "show");
  },

  gameover() {
    const totalTime = document.getElementById("gameTimer").innerHTML;
    const actualRating = document.querySelector(".stars");
    if (memorygame.cardcount.length === 16) {
      //adding the modal from sweetalert js  https://sweetalert.js.org/guides/
      swal("Congratulations ", "It took you " + memorygame.moves + " moves to finish the board in " + totalTime + " your rating is " + actualRating.childElementCount + " stars", "success", {
        button: "Play again"
      });

      const playagain = document.querySelector(".swal-button");
      playagain.addEventListener("click", function() {
        location.reload(true);
      });
    }
  },

  shufflecards() {
    let container = document.querySelector(".deck");
    let shuffleDeck = shuffle(memorygame.icons);

    // shuffle and create the cards
    for (let i = 0; i < shuffleDeck.length; i++) {
      var card = document.createElement("li");
      card.innerHTML = `<i class="${shuffleDeck[i]}"></i>`;
      card.classList.add("card");

      container.appendChild(card);
    }
  },

  //game initiation
  createcards() {
    memorygame.shufflecards();
    // flip the cards open when click
    document.querySelector(".deck").addEventListener("click", function(evt) {
      if (evt.target.className === "card") {
        evt.target.classList.add("open", "show");
        memorygame.opencards.push(evt.target);
      }
      //check matching cards
      if (memorygame.opencards.length === 2) {
        // marking the number of moves
        memorygame.moves++;
        document.querySelector(".moves").textContent = memorygame.moves;
        memorygame.rating();

        let firstcard = memorygame.opencards[0];
        let secondcard = memorygame.opencards[1];
        if (firstcard.innerHTML === secondcard.innerHTML) {
          firstcard.classList.add("match", "animated", "rubberBand");
          secondcard.classList.add("match", "animated", "rubberBand");

          memorygame.cardcount.push(firstcard, secondcard);
          // check if game board is complete
          memorygame.gameover();
          memorygame.opencards = [];
        } else {
          //if no match...
          memorygame.opencards = [];
          firstcard.classList.add("animated", "shake");
          secondcard.classList.add("animated", "shake");
          setTimeout(function() {
            firstcard.classList.remove("open", "show", "animated", "shake");

            secondcard.classList.remove("open", "show", "animated", "shake");
          }, 500);
        }
      }
    });
  }
};

memorygame.createcards();
memorygame.timer();

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
