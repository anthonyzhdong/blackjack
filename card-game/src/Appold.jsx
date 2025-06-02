// App.jsx
import React from 'react';
import Card from './Card';
import './App.css';

// collection of cards and their associated values
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
  //player hand
  const [playerScore, setPlayerScore] = React.useState(0);
  const [playerHand, setPlayerHand] = React.useState([]);

  //dealer hand
  const [dealerScore, setDealerScore] = React.useState(0);
  const [dealerHand, setDealerHand] = React.useState([]);

  //deck of dealt cards
  const [dealtCards, setDealtCards] = React.useState(new Set());

  //did we roll an ace? If we did, keep a track of score using ace (11)
  const [rolledAce, setRolledAce] = React.useState(false);
  const [ace11Score, setAce11Score] = React.useState(0);

  //did the dealer roll an ace? If they did, keep a track of score using ace (11)
  const [dealerAce, setDealerAce] = React.useState(false);
  const [dealerAceScore, setDealerAceScore] = React.useState(0);

  //player turn & game over
  const [playerTurn, setPlayerTurn] = React.useState(true);
  const [gameOver, setGameOver] = React.useState(false);

  //money management
  const [money, setMoney] = React.useState(500);
  const [bet, setBet] = React.useState('');

  const [betConfirmed, setBetConfirmed] = React.useState(false);
  

  //const [gameStarted, setGameStarted] = React.useState(false);

  //enter amount then game begins

  //start
  React.useEffect(() => {
    dealInitialCards();
  }, []);

  // dealers turn and player didn't bust
  React.useEffect(() => {
    if (!playerTurn && !gameOver) {
      dealDealerCards();
    }
  }, [playerTurn, gameOver]);

  // deals random card and adds to dealtCards
  function dealRandomCard(dealtCards) {
    let newCardIndex;
    do {
      newCardIndex = Math.floor(Math.random() * cardData.length);
    } while (dealtCards.has(newCardIndex));

    dealtCards.add(newCardIndex);
    return newCardIndex;
  }

  // deals initial hand for player and dealer
  function dealInitialCards() {
    const newDealtCards = new Set();
    const playerStartingHand = [];
    let playerStartingScore = 0;
    let playerStartingAceShowed = false;
    let playerStartingAceScore = 0;

    const dealerStartingHand = [];
    let dealerStartingScore = 0;
    let dealerAceBoolean = false;
    let dealerAce11Score = 0;

    // 2 cards each
    for (let i = 0; i < 2; i++) {
      const playerCardIndex = dealRandomCard(newDealtCards);
      playerStartingHand.push(playerCardIndex);
      playerStartingScore += cardData[playerCardIndex].value;
      // if we roll an ace, keep track of normal & ace score
      if (cardData[playerCardIndex].value === 1) {
        playerStartingAceShowed = true;
        playerStartingAceScore = playerStartingScore + 10;
      }
      // ???
      if (i === 1 && playerStartingAceShowed) {
        playerStartingAceScore = playerStartingScore + 10;
      }

      //dealer
      const dealerCardIndex = dealRandomCard(newDealtCards);
      dealerStartingHand.push(dealerCardIndex);
      dealerStartingScore += cardData[dealerCardIndex].value;

      if (cardData[dealerCardIndex].value == 1) {
        dealerAceBoolean = true;
        dealerAce11Score = dealerStartingScore + 10;
      }
      if (i === 1 && dealerAceBoolean) {
        dealerAce11Score = dealerStartingScore + 10;
      }
    }
    if (playerStartingAceShowed) {
      setRolledAce(true);
      setAce11Score(playerStartingAceScore);
    }
    if (dealerAceBoolean) {
      setDealerAce(true);
      setDealerAceScore(dealerAce11Score);
    }
    setPlayerScore(playerStartingScore);
    setPlayerHand(playerStartingHand);
    setDealerHand(dealerStartingHand);
    setDealerScore(dealerStartingScore);
    setDealtCards(newDealtCards);
  }

  // adds new card to players hand
  function addNewCard() {
    if (playerTurn && !gameOver) {
      // gets random card
      const newCardIndex = dealRandomCard(dealtCards);
      // new hand = previous + new card
      setPlayerHand((prevHand) => [...prevHand, newCardIndex]);

      let newScore = playerScore + cardData[newCardIndex].value;

      if (newScore > 21) {
        setGameOver(true);
      }
      if (rolledAce) {
        let testScore = newScore + 10;
        if (testScore > 21) {
          setRolledAce(false);
        } else {
          setAce11Score(testScore);
        }
      }

      setPlayerScore(newScore);

    }
  }
  // resets game state
  function clearHand() {
    setPlayerHand([]);
    setPlayerScore(0);
    setDealerHand([]);
    setDealerScore(0);
    setDealtCards(new Set());
    setRolledAce(false);
    setAce11Score(0);
    setDealerAce(false);
    setDealerAceScore(0);
    setPlayerTurn(true);
    setGameOver(false);
    setBet('');
    setBetConfirmed(false);

    //setGameStarted(false);
    dealInitialCards();
  }

  function newSession(){
    setMoney(500);
    clearHand();
  }

  // stand = dealers turn
  function handleStand() {
    setPlayerTurn(false);
  }

  // dealerAce = true
  // dealerAceScore = dealerScore + 10
  // if dealerAceScore (initial score) > 17 = STAND
  // 


  //bugs out on 8 2 ace
  function dealDealerCards() {
    // gets existing dealer hand
    let newDealerScore = dealerScore;
    let newDealerAceScore = dealerAceScore;
    const newDealerHand = [...dealerHand];

    //if score + ace 11 > 17 stand 
    //keep rolling until newDealerScore < 17 -> cross check w dealerAceScore

    if (newDealerAceScore > 16) {
      setDealerScore(newDealerScore);
      setDealerHand(newDealerHand);
      setDealerAceScore(newDealerAceScore);
      setGameOver(true);
    } else {
      while ((newDealerAceScore > 21 && newDealerAceScore < 17) || newDealerScore < 17) {
        //draw a card
        const newCardIndex = dealRandomCard(dealtCards);
        newDealerHand.push(newCardIndex);
        newDealerScore += cardData[newCardIndex].value;
        if (dealerAce || cardData[newCardIndex].value === 1) {
          newDealerAceScore = newDealerScore + 10;
        }
        if (newDealerAceScore > 21) {
          setDealerAce(false);
        }

      }
      setDealerScore(newDealerScore);
      setDealerHand(newDealerHand);
      setDealerAceScore(newDealerAceScore);
      setGameOver(true);
    }


    // while dealerScore < 17 and dealerAce <17 but less than 21
    // add card
    // if dealerAce

    // dealer must draw on 16 or less
    // while (newDealerScore < 17) {
    //   const newCardIndex = dealRandomCard(dealtCards);
    //   newDealerHand.push(newCardIndex);
    //   newDealerScore += cardData[newCardIndex].value;

    //   if(dealerAce){
    //     let newDealerAceScore = newDealerScore+10;
    //     if(newDealerAceScore > 17 && newDealerAceScore <= 21){
    //       // break
    //       setDealerAce(false);
    //     }else{
    //       setDealerAceScore(newDealerAceScore);

    //     }


    //   }

    // }

    // setDealerScore(newDealerScore);
    // setDealerHand(newDealerHand);

    // setGameOver(true);
  }

  //add bet winnings/losings

  function win(bet){
    setMoney(money + (bet*2));
  }

  function lose(bet){
    setMoney(money - bet);
  }



  function determineWinner() {
    const finalPlayerScore = rolledAce && ace11Score <= 21 ? ace11Score : playerScore;
    const finalDealerScore = dealerAce && dealerAceScore <= 21 ? dealerAceScore : dealerScore;
    if (finalPlayerScore > 21){
     // setMoney((prevMoney) => prevMoney - bet);
      return 'You lost!';
    } 
    if (finalDealerScore > 21 || finalPlayerScore > finalDealerScore){
      //const newMoney = money + (bet * 2);
      //setMoney(600);
      //setMoney((prevMoney) => prevMoney + (Number(bet)*2));
      //setMoney(prevMoney => prevMoney + (bet * 2));
      return 'You won!';
    } 
    if (finalPlayerScore < finalDealerScore){
      //setMoney((prevMoney) => prevMoney - bet);
      return 'You lost!';
    } 
    return 'It\'s a tie!';
  }

  const handleBetChange = (event) => {
    const value = event.target.value.trim(); // Remove leading/trailing spaces
    const newBet = value === '' ? '' : Math.min(Math.max(Number(value), 1), money);
    setBet(newBet);
  };
  
  const handleBetEnter = (event) => {
    if (event.key === 'Enter') {
      const value = event.target.value.trim(); // Remove leading/trailing spaces
      const newBet = value === '' ? '' : Math.min(Math.max(Number(value), 1), money);
      setBet(newBet);
    }
  };

  React.useEffect(() => {
    if (gameOver && determineWinner() === 'You won!') {
      win(bet); // Update money when player wins
    }
  }, [gameOver]);

  React.useEffect(() => {
    if (gameOver && determineWinner() === 'You lost!') {
      lose(bet); // Update money when player wins
    }
  }, [gameOver]);


  // Function to confirm the bet
  const confirmBet = () => {
    setBetConfirmed(true);
  };
  


  //  <h1>Blackjack</h1>
  return (
    <div className="App">
      <buttons>
      <button onClick={clearHand}>New Round</button>
      <button onClick={newSession}>New Session</button>
      </buttons>
      <p>Money: ${money}</p>
      {/*
      <div className="bet">
        <input
          type="number"
          name="betting"
          min="1"
          max={money}
          value={bet}
          onChange={handleBetChange}
          onKeyDown={handleBetEnter}
          disabled={betConfirmed} // Disable input if bet is confirmed
          />
          {!betConfirmed && ( // Show confirm button if bet is not confirmed
            <button onClick={confirmBet}>Confirm</button>
          )}
      </div>
      */}
     
      {/*<p>Dealer's Hand ({gameOver ? dealerScore : '?'})</p>*/}
      <p>Dealer's Hand ({gameOver ? (dealerAce && dealerAceScore > dealerScore ? dealerAceScore : dealerScore) : '?'})</p>
      {/*(dealerAce && dealerAceScore <= 21 ? dealerAceScore : dealerScore)   <p>{dealerAceScore}</p>*/}

      <div className="hand">
        {dealerHand.map((c, index) =>
          index === 0 || gameOver ? (
            <Card key={index} card={cardData[c]} />
          ) : (
            <Card key={index} card={{ img: './cards/back.svg' }} />
            
          )
        )}
      </div>

      {/*bet > 0 && <div className="bet-display">Current Bet: ${bet}</div>*/}

      <div className="score">
        <p>{gameOver ? (rolledAce && ace11Score <= 21 ? ace11Score : playerScore) : (rolledAce ? `${playerScore} / ${ace11Score}` : playerScore)}</p>
      </div>


      { /* <p>Your Hand ({playerScore}) / {ace11Score}</p> */}
      <div className="hand">
        {playerHand.map((c, index) => (
          <Card key={index} card={cardData[c]} />
        ))}
      </div>



      {/* {aceChoice && (
        <div>
          <button onClick={() => handleAceChoice(1)}>Count Ace as 1</button>
          <button onClick={() => handleAceChoice(11)}>Count Ace as 11</button>
        </div>
      )} */}
      {!gameOver && (
        <div>
          {/* <button onClick={addNewCard} disabled={playerScore >= 21 || aceChoice}>Hit</button>
          <button onClick={handleStand} disabled = {aceChoice}>Stand</button> */}
          <button onClick={addNewCard} disabled={playerScore >= 21}>Hit</button>
          <button onClick={handleStand}>Stand</button>
        </div>
      )}

      {gameOver && <h1>{determineWinner()}</h1>}
      
      
    </div>
  );
}

export default App;

// handle dealer aces
// add betting and currency

// we know the players score once they stand
// dealer
// dealer ace = 1 (normal score)
// dealer ace 2 = 11 (normal score + 10)
// while hands are less than player score && 17
// draw cards, update both scores. 