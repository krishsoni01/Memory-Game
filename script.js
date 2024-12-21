var mainBody;
var audio = new Audio('ting.mp3');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function makeCards() {
    const colors = ['blue', 'red', 'green', 'yellow', 'pink', 'white'];
    let colorPairs = colors.concat(colors);
    colorPairs = shuffle(colorPairs);

    var cards = "";
    mainBody = document.querySelector(".main");

    for (let i = 0; i < colorPairs.length; i++) {
        cards += `
            <div style="background-color: ${colorPairs[i]}" class="card">
                <div class="hide"></div>
            </div>`;
    }
    mainBody.innerHTML = cards;
}

function checkAllCardsOpened() {
    var allOpened = true;
    var hides = document.querySelectorAll(".card .hide");
    
    hides.forEach(function(hideDiv) {
        if (hideDiv.style.opacity !== "0") {
            allOpened = false;
        }
    });

    if (allOpened) {
        
        mainBody.innerHTML = `
            <h1 class="result">Congratulations! You've Won</h1>
            <button class="play-again" onclick="restartGame()">Play Again</button>`;
    }
}

function restartGame() {
    makeCards();
    cardClickEvent();
}

function cardClickEvent() {
    var boxes = document.querySelectorAll(".card");
    var openedCards = [];

    boxes.forEach(function(card) {
        card.addEventListener("click", function() {
            var hideDiv = card.querySelector(".hide");

            if (openedCards.length < 2 && hideDiv.style.opacity !== "0") {
                audio.play();
                hideDiv.style.opacity = 0;
                openedCards.push(card);

                if (openedCards.length === 2) {
                    var color1 = openedCards[0].style.backgroundColor;
                    var color2 = openedCards[1].style.backgroundColor;

                    if (color1 === color2) {
                        openedCards.forEach(function(openedCard) {
                            openedCard.querySelector(".hide").classList.remove('hide');
                        });
                        openedCards = [];
                        checkAllCardsOpened();
                    } else {
                        setTimeout(function() {
                            openedCards.forEach(function(openedCard) {
                                openedCard.querySelector('.hide').style.opacity = 1;
                            });
                            openedCards = [];
                        }, 1000);
                    }
                }
            }
        });
    });
}

makeCards();
cardClickEvent();
