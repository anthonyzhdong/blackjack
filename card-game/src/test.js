const cardData = [
    { value: 1, img: './cards/ace_of_spades.svg' },
    { value: 2, img: './cards/2_of_spades.svg' },
    { value: 3, img: './cards/3_of_spades.svg' },
    { value: 4, img: './cards/4_of_spades.svg' },
    { value: 5, img: './cards/5_of_spades.svg' },
    { value: 6, img: './cards/6_of_spades.svg' },
    { value: 7, img: './cards/7_of_spades.svg' },
    { value: 8, img: './cards/8_of_spades.svg' },
    { value: 9, img: './cards/9_of_spades.svg' },
    { value: 10, img: './cards/10_of_spades.svg' },
    { value: 10, img: './cards/jack_of_spades2.svg' },
    { value: 10, img: './cards/queen_of_spades2.svg' },
    { value: 10, img: './cards/king_of_spades2.svg' },
    { value: 1, img: './cards/ace_of_clubs.svg' },
    { value: 2, img: './cards/2_of_clubs.svg' },
    { value: 3, img: './cards/3_of_clubs.svg' },
    { value: 4, img: './cards/4_of_clubs.svg' },
    { value: 5, img: './cards/5_of_clubs.svg' },
    { value: 6, img: './cards/6_of_clubs.svg' },
    { value: 7, img: './cards/7_of_clubs.svg' },
    { value: 8, img: './cards/8_of_clubs.svg' },
    { value: 9, img: './cards/9_of_clubs.svg' },
    { value: 10, img: './cards/10_of_clubs.svg' },
    { value: 10, img: './cards/jack_of_clubs2.svg' },
    { value: 10, img: './cards/queen_of_clubs2.svg' },
    { value: 10, img: './cards/king_of_clubs2.svg' },
    { value: 1, img: './cards/ace_of_hearts.svg' },
    { value: 2, img: './cards/2_of_hearts.svg' },
    { value: 3, img: './cards/3_of_hearts.svg' },
    { value: 4, img: './cards/4_of_hearts.svg' },
    { value: 5, img: './cards/5_of_hearts.svg' },
    { value: 6, img: './cards/6_of_hearts.svg' },
    { value: 7, img: './cards/7_of_hearts.svg' },
    { value: 8, img: './cards/8_of_hearts.svg' },
    { value: 9, img: './cards/9_of_hearts.svg' },
    { value: 10, img: './cards/10_of_hearts.svg' },
    { value: 10, img: './cards/jack_of_hearts2.svg' },
    { value: 10, img: './cards/queen_of_hearts2.svg' },
    { value: 10, img: './cards/king_of_hearts2.svg' },
    { value: 1, img: './cards/ace_of_diamonds.svg' },
    { value: 2, img: './cards/2_of_diamonds.svg' },
    { value: 3, img: './cards/3_of_diamonds.svg' },
    { value: 4, img: './cards/4_of_diamonds.svg' },
    { value: 5, img: './cards/5_of_diamonds.svg' },
    { value: 6, img: './cards/6_of_diamonds.svg' },
    { value: 7, img: './cards/7_of_diamonds.svg' },
    { value: 8, img: './cards/8_of_diamonds.svg' },
    { value: 9, img: './cards/9_of_diamonds.svg' },
    { value: 10, img: './cards/10_of_diamonds.svg' },
    { value: 10, img: './cards/jack_of_diamonds2.svg' },
    { value: 10, img: './cards/queen_of_diamonds2.svg' },
    { value: 10, img: './cards/king_of_diamonds2.svg' },
  ];
  // Define initial state variables
let score = 0;
let hand = [];
let dealtCards = new Set();

// Function to deal a random card index
function dealRandomCard(dealtCards) {
  let newCardIndex;
  do {
    newCardIndex = Math.floor(Math.random() * cardData.length);
  } while (dealtCards.has(newCardIndex));

  dealtCards.add(newCardIndex);

  return newCardIndex;
}

// Function to deal initial cards
function dealInitialCards() {
  const newHand = [];
  let newScore = 0;
  const newDealtCards = new Set();

  for (let i = 0; i < 2; i++) {
    const newCardIndex = dealRandomCard(newDealtCards);
    newHand.push(newCardIndex);
    newScore += cardData[newCardIndex].value;
    newDealtCards.add(newCardIndex);
  }

  hand = newHand;
  score = newScore;
  dealtCards = newDealtCards;
}

  
  function testDealInitialCards() {
    const numTests = 100000; // Number of tests to run
    const duplicates = new Set(); // Set to store duplicate cards
  
    for (let i = 0; i < numTests; i++) {
      const newDealtCards = new Set();
      dealInitialCards(); // Run dealInitialCards()
      hand.forEach(cardIndex => {
        if (newDealtCards.has(cardIndex)) {
          // If the card has already been dealt in this hand, it's a duplicate
          duplicates.add(cardIndex);
        } else {
          newDealtCards.add(cardIndex);
        }
      });
    }
  
    if (duplicates.size > 0) {
      console.log("Duplicates found:");
      duplicates.forEach(cardIndex => {
        console.log(cardData[cardIndex]);
      });
    } else {
      console.log("No duplicates found in", numTests, "tests.");
    }
  }
  
  // Run the test method
  testDealInitialCards();
  