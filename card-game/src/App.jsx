// App.jsx
import React from 'react';
import Card from './Card';
import './App.css';

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

function App() {

  const [score, setScore] = React.useState(0);
  const [hand, setHand] = React.useState([]);
  const [dealtCards, setDealtCards] = React.useState(new Set())

  React.useEffect(() => {
    dealInitialCards();
  }, []);

   // Function to update the dealt cards set
   // maybe too extrapolated, can condense into other methods
   function addCardToDealtCards(cardIndex) {
    setDealtCards((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.add(cardIndex);
      return newSet;
    });
  }

  function dealRandomCard() {
    let newCardIndex;
    do {
      newCardIndex = Math.floor(Math.random() * cardData.length);
    } while (dealtCards.has(newCardIndex));

    addCardToDealtCards(newCardIndex);
    return newCardIndex;
  }

  // deals 2 cards
  function dealInitialCards() {
    const newHand = [];
    let newScore = 0;
    const newDealtCards = new Set();
    for (let i = 0; i < 2; i++) {
      let newCardIndex;
      // check to ensure we don't get duplicate cards as we aren't setting dealt cards till after we roll both
      do {
      newCardIndex = Math.floor(Math.random() * cardData.length);
      } while (newDealtCards.has(newCardIndex));

      newHand.push(newCardIndex);
      newScore += cardData[newCardIndex].value;
      newDealtCards.add(newCardIndex);
    }
    setHand(newHand);
    setScore(newScore);
    setDealtCards(newDealtCards);
  }

  //adds new card
  function addNewCard() {
    const newCardIndex = dealRandomCard();
    setHand((prevHand) => [...prevHand, newCardIndex]);
    setScore((prevScore) => prevScore + cardData[newCardIndex].value);
  }

  // resets the game state
  function clearHand() {
    setHand([]);
    setScore(0);
    setDealtCards(new Set());
    dealInitialCards();
  }

  return (
    <div className="App">
      <h1>Blackjack</h1>
      <p>Score: {score}</p>

      {/* <button onClick={increaseScore}>Add Score</button> */}

      <button onClick={addNewCard} disabled={score >= 21} >New Card</button>

      <button onClick={clearHand} >New Game</button>
      
      <div className="hand">
        {hand.map((c) => <Card card={cardData[c]} />)}
      </div>

      {score === 21 && <h1>You won!</h1>}
      {score > 21 && <h1>You lost</h1>}
    </div>
  );


}

export default App; // exported so index.js can load it
