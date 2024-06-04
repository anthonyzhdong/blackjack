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
  const [playerScore, setPlayerScore] = React.useState(0);
  const [playerHand, setPlayerHand] = React.useState([]);
  const [dealerScore, setDealerScore] = React.useState(0);
  const [dealerHand, setDealerHand] = React.useState([]);
  const [dealtCards, setDealtCards] = React.useState(new Set());
  const [aceChoice, setAceChoice] = React.useState(false);
  const [aceCardIndex, setAceCardIndex] = React.useState(null);
  const [playerTurn, setPlayerTurn] = React.useState(true);
  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    dealInitialCards();
  }, []);

  React.useEffect(() => {
    if (!playerTurn && !gameOver) {
      dealDealerCards();
    }
  }, [playerTurn, gameOver]);

  function dealRandomCard(dealtCards) {
    let newCardIndex;
    do {
      newCardIndex = Math.floor(Math.random() * cardData.length);
    } while (dealtCards.has(newCardIndex));

    dealtCards.add(newCardIndex);
    return newCardIndex;
  }

  function dealInitialCards() {
    const newPlayerHand = [];
    let newPlayerScore = 0;

    const newDealerHand = [];
    let newDealerScore = 0;

    const newDealtCards = new Set();
    for (let i = 0; i < 2; i++) {
      const newPlayerCardIndex = dealRandomCard(newDealtCards);
      if (cardData[newPlayerCardIndex].value !== 1) {
        newPlayerHand.push(newPlayerCardIndex);
        newPlayerScore += cardData[newPlayerCardIndex].value;
      } else {
        setAceChoice(true);
        setAceCardIndex(newPlayerCardIndex);
      }

      const newDealerCardIndex = dealRandomCard(newDealtCards);
      newDealerHand.push(newDealerCardIndex);
      newDealerScore += cardData[newDealerCardIndex].value;
    }

    setPlayerHand(newPlayerHand);
    setPlayerScore(newPlayerScore);
    setDealerHand(newDealerHand);
    setDealerScore(newDealerScore);
    setDealtCards(newDealtCards);
  }

  function addNewCard() {
    if (!aceChoice && playerTurn && !gameOver) {
      const newCardIndex = dealRandomCard(dealtCards);
      if (cardData[newCardIndex].value === 1) {
        setAceChoice(true);
        setAceCardIndex(newCardIndex);
      } else {
        setPlayerHand((prevHand) => [...prevHand, newCardIndex]);
        setPlayerScore((prevScore) => {
          const newScore = prevScore + cardData[newCardIndex].value;
          if (newScore > 21) setGameOver(true);
          return newScore;
        });
      }
    }
  }

  function clearHand() {
    setPlayerHand([]);
    setPlayerScore(0);
    setDealerHand([]);
    setDealerScore(0);
    setDealtCards(new Set());
    setAceChoice(false);
    setAceCardIndex(null);
    setPlayerTurn(true);
    setGameOver(false);
    dealInitialCards();
  }

  function handleAceChoice(value) {
    setPlayerHand((prevHand) => [...prevHand, aceCardIndex]);
    setPlayerScore((prevScore) => {
      const newScore = prevScore + value;
      if (newScore > 21) setGameOver(true);
      return newScore;
    });
    setAceChoice(false);
    setAceCardIndex(null);
  }

  function handleStand() {
    setPlayerTurn(false);
  }

  function dealDealerCards() {
    let newDealerScore = dealerScore;
    const newDealerHand = [...dealerHand];
    while (newDealerScore < 17) {
      const newCardIndex = dealRandomCard(dealtCards);
      newDealerHand.push(newCardIndex);
      newDealerScore += cardData[newCardIndex].value;
    }
    setDealerHand(newDealerHand);
    setDealerScore(newDealerScore);
    setGameOver(true);
  }

  function determineWinner() {
    if (playerScore > 21) return 'You lost!';
    if (dealerScore > 21 || playerScore > dealerScore) return 'You won!';
    if (playerScore < dealerScore) return 'You lost!';
    return 'It\'s a tie!';
  }

  return (
    <div className="App">
      <h1>Blackjack</h1>
      <p>Player Score: {playerScore}</p>
      <div className="hand">
        {playerHand.map((c) => <Card key={c} card={cardData[c]} />)}
      </div>
      <p>Dealer Score: {gameOver ? dealerScore : '?'}</p>
      <div className="hand">
        {dealerHand.map((c, index) =>
          index === 0 || gameOver ? (
            <Card key={index} card={cardData[c]} />
          ) : (
            <Card key={index} card={{ img: './cards/back_of_card.svg' }} />
          )
        )}
      </div>
      {aceChoice && (
        <div>
          <button onClick={() => handleAceChoice(1)}>Count Ace as 1</button>
          <button onClick={() => handleAceChoice(11)}>Count Ace as 11</button>
        </div>
      )}
      {!gameOver && (
        <div>
          <button onClick={addNewCard} disabled={playerScore >= 21 || aceChoice}>Hit</button>
          <button onClick={handleStand}>Stand</button>
        </div>
      )}
      <button onClick={clearHand}>New Game</button>
      {gameOver && <h1>{determineWinner()}</h1>}
    </div>
  );
}

export default App;

