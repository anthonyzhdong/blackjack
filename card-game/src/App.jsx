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
  // Money management
  const [money, setMoney] = React.useState(500);
  
  // Game state
  const [gamePhase, setGamePhase] = React.useState('betting'); // betting, playing, dealer, results
  const [dealtCards, setDealtCards] = React.useState(new Set());
  const [activeHandIndex, setActiveHandIndex] = React.useState(0);
  
  // Dealer hand
  const [dealerHand, setDealerHand] = React.useState([]);
  const [dealerScore, setDealerScore] = React.useState(0);
  const [dealerAce, setDealerAce] = React.useState(false);
  const [dealerAceScore, setDealerAceScore] = React.useState(0);
  
  // Multiple player hands
  const [playerHands, setPlayerHands] = React.useState([
    {
      cards: [],
      score: 0,
      aceScore: 0,
      hasAce: false,
      bet: 0,
      betConfirmed: false,
      finished: false,
      result: null // win, lose, push, blackjack
    }
  ]);

  // Initialize game with empty hands
  React.useEffect(() => {
    resetGame();
  }, []);

  // Handle dealer's turn when all player hands are finished
  React.useEffect(() => {
    if (gamePhase === 'dealer') {
      dealDealerCards();
    }
  }, [gamePhase]);

  // Determine results when dealer finishes
  React.useEffect(() => {
    if (gamePhase === 'results') {
      calculateResults();
    }
  }, [gamePhase]);

  // Reset game to initial betting state
  function resetGame() {
    setDealerHand([]);
    setDealerScore(0);
    setDealerAce(false);
    setDealerAceScore(0);
    setDealtCards(new Set());
    setGamePhase('betting');
    setActiveHandIndex(0);
    
    // Start with one empty hand
    setPlayerHands([
      {
        cards: [],
        score: 0,
        aceScore: 0,
        hasAce: false,
        bet: 0,
        betConfirmed: false,
        finished: false,
        result: null
      }
    ]);
  }

  // Add a new hand 
  function addHand() {
    if (gamePhase !== 'betting' || playerHands.length >= 3) return; // Limit to 3 hands
    
    setPlayerHands([...playerHands, {
      cards: [],
      score: 0,
      aceScore: 0,
      hasAce: false,
      bet: 0,
      betConfirmed: false,
      finished: false,
      result: null
    }]);
  }

  // Remove a hand
  function removeHand(index) {
    if (gamePhase !== 'betting' || playerHands.length <= 1) return;
    
    const newHands = [...playerHands];
    newHands.splice(index, 1);
    setPlayerHands(newHands);
  }

  // Update bet for a specific hand
  function updateBet(index, amount) {
    if (gamePhase !== 'betting' || amount > money) return;
    
    const newHands = [...playerHands];
    newHands[index].bet = amount;
    setPlayerHands(newHands);
  }

  // Confirm bet for a specific hand
  function confirmBet(index) {
    if (gamePhase !== 'betting' || playerHands[index].bet <= 0) return;
    
    const newHands = [...playerHands];
    newHands[index].betConfirmed = true;
    setPlayerHands(newHands);
    
    // Check if all bets are confirmed
    if (newHands.every(hand => hand.betConfirmed)) {
      startDeal();
    }
  }

  // Deal random card
  function dealRandomCard(dealtCards) {
    let newCardIndex;
    do {
      newCardIndex = Math.floor(Math.random() * cardData.length);
    } while (dealtCards.has(newCardIndex));

    dealtCards.add(newCardIndex);
    return newCardIndex;
  }

  // Start the deal after all bets are placed
  function startDeal() {
    const newDealtCards = new Set(dealtCards);
    const newHands = [...playerHands];
    
    // Deal two cards to each player hand
    newHands.forEach((hand, index) => {
      const cards = [];
      let score = 0;
      let hasAce = false;
      
      // Deal two cards to this hand
      for (let i = 0; i < 2; i++) {
        const cardIndex = dealRandomCard(newDealtCards);
        cards.push(cardIndex);
        
        if (cardData[cardIndex].value === 1) {
          hasAce = true;
        }
        
        score += cardData[cardIndex].value;
      }
      
      // Calculate ace score if needed
      const aceScore = hasAce ? score + 10 : score;
      
      // Update hand
      newHands[index] = {
        ...hand,
        cards,
        score,
        aceScore,
        hasAce,
        // Check for blackjack
        finished: (hasAce && aceScore === 21)
      };
      
      // If blackjack, set result
      if (hasAce && aceScore === 21) {
        newHands[index].result = 'blackjack';
      }
    });
    
    // Deal two cards to dealer
    const dealerCards = [];
    let newDealerScore = 0;
    let newDealerHasAce = false;
    
    for (let i = 0; i < 2; i++) {
      const cardIndex = dealRandomCard(newDealtCards);
      dealerCards.push(cardIndex);
      
      if (cardData[cardIndex].value === 1) {
        newDealerHasAce = true;
      }
      
      newDealerScore += cardData[cardIndex].value;
    }
    
    const newDealerAceScore = newDealerHasAce ? newDealerScore + 10 : newDealerScore;
    
    // Update state
    setDealerHand(dealerCards);
    setDealerScore(newDealerScore);
    setDealerAce(newDealerHasAce);
    setDealerAceScore(newDealerAceScore);
    setDealtCards(newDealtCards);
    setPlayerHands(newHands);
    
    // Check if all hands are blackjack - go straight to dealer phase
    if (newHands.every(hand => hand.finished)) {
      setGamePhase('dealer');
    } else {
      setGamePhase('playing');
    }
  }

  // Hit - add card to current active hand
  function hit() {
    if (gamePhase !== 'playing') return;
    
    const newDealtCards = new Set(dealtCards);
    const newHands = [...playerHands];
    const hand = newHands[activeHandIndex];
    
    // Deal new card
    const cardIndex = dealRandomCard(newDealtCards);
    const newCards = [...hand.cards, cardIndex];
    
    // Calculate new score
    let newScore = hand.score + cardData[cardIndex].value;
    let newHasAce = hand.hasAce;
    
    // Check if new card is an ace
    if (cardData[cardIndex].value === 1) {
      newHasAce = true;
    }
    
    // Calculate ace score
    let newAceScore = newHasAce ? newScore + 10 : newScore;
    
    // Check for bust
    let finished = false;
    let result = null;
    
    if (newScore > 21 && (!newHasAce || newAceScore > 21)) {
      finished = true;
      result = 'lose';
    }
    
    // Update hand
    newHands[activeHandIndex] = {
      ...hand,
      cards: newCards,
      score: newScore,
      aceScore: newAceScore,
      hasAce: newHasAce,
      finished,
      result
    };
    
    // Move to next hand if current is finished
    let newActiveHandIndex = activeHandIndex;
    if (finished) {
      newActiveHandIndex = findNextActiveHand(newHands, activeHandIndex);
    }
    
    // Update state
    setDealtCards(newDealtCards);
    setPlayerHands(newHands);
    setActiveHandIndex(newActiveHandIndex);
    
    // Check if all hands are finished - move to dealer phase
    if (newHands.every(h => h.finished) || newActiveHandIndex === -1) {
      setGamePhase('dealer');
    }
  }

  // Stand - finish current hand and move to next
  function stand() {
    if (gamePhase !== 'playing') return;
    
    const newHands = [...playerHands];
    newHands[activeHandIndex].finished = true;
    
    // Find next active hand
    const newActiveHandIndex = findNextActiveHand(newHands, activeHandIndex);
    
    // Update state
    setPlayerHands(newHands);
    setActiveHandIndex(newActiveHandIndex);
    
    // Check if all hands are finished - move to dealer phase
    if (newHands.every(h => h.finished) || newActiveHandIndex === -1) {
      setGamePhase('dealer');
    }
  }

  // Find next active hand
  function findNextActiveHand(hands, currentIndex) {
    for (let i = currentIndex + 1; i < hands.length; i++) {
      if (!hands[i].finished) {
        return i;
      }
    }
    return -1; // No more active hands
  }

  // Dealer's turn
  function dealDealerCards() {
    const newDealtCards = new Set(dealtCards);
    const newDealerHand = [...dealerHand];
    let newDealerScore = dealerScore;
    let newDealerAce = dealerAce;
    let newDealerAceScore = dealerAceScore;
    
    // Check if dealer needs to hit
    // Dealer must hit until score >= 17 (using ace as 11 if possible)
    while ((newDealerAce && newDealerAceScore < 17) || 
           (!newDealerAce && newDealerScore < 17)) {
      
      // Deal new card
      const cardIndex = dealRandomCard(newDealtCards);
      newDealerHand.push(cardIndex);
      
      // Update score
      newDealerScore += cardData[cardIndex].value;
      
      // Check if new card is an ace
      if (cardData[cardIndex].value === 1) {
        newDealerAce = true;
      }
      
      // Calculate ace score
      newDealerAceScore = newDealerAce ? newDealerScore + 10 : newDealerScore;
      
      // Check if ace score busts - use regular score instead
      if (newDealerAce && newDealerAceScore > 21) {
        newDealerAce = false;
      }
    }
    
    // Update state
    setDealerHand(newDealerHand);
    setDealerScore(newDealerScore);
    setDealerAce(newDealerAce);
    setDealerAceScore(newDealerAceScore);
    setDealtCards(newDealtCards);
    setGamePhase('results');
  }

  // Calculate results for all hands
  function calculateResults() {
    const finalDealerScore = dealerAce && dealerAceScore <= 21 ? dealerAceScore : dealerScore;
    const dealerBusted = finalDealerScore > 21;
    
    const newHands = playerHands.map(hand => {
      const finalPlayerScore = hand.hasAce && hand.aceScore <= 21 ? hand.aceScore : hand.score;
      let result = hand.result; // Keep existing result (e.g., blackjack)
      
      // Calculate result if not already determined
      if (result === null) {
        if (finalPlayerScore > 21) {
          result = 'lose';
        } else if (dealerBusted) {
          result = 'win';
        } else if (finalPlayerScore > finalDealerScore) {
          result = 'win';
        } else if (finalPlayerScore < finalDealerScore) {
          result = 'lose';
        } else {
          result = 'push';
        }
      }
      
      return {
        ...hand,
        result
      };
    });
    
    // Update player hands with results
    setPlayerHands(newHands);
    
    // Update money based on results
    let newMoney = money;
    newHands.forEach(hand => {
      if (hand.result === 'blackjack') {
        newMoney += hand.bet * 1.5; // Blackjack pays 3:2
      } else if (hand.result === 'win') {
        newMoney += hand.bet;
      } else if (hand.result === 'lose') {
        newMoney -= hand.bet;
      }
      // Push: no change to money
    });
    
    setMoney(newMoney);
  }

  // Start a new round
  function newRound() {
    resetGame();
  }

  // Start a new session (reset money)
  function newSession() {
    setMoney(500);
    resetGame();
  }

  // Render game
  return (
    <div className="App">
      <div className="buttons">
        <button onClick={newRound}>New Round</button>
        <button onClick={newSession}>New Session</button>
      </div>
      
      <div className="money">
        <p>Money: ${money}</p>
      </div>
      
      {/* Dealer's hand */}
      <div className="dealer-section">
        <p>Dealer's Hand ({gamePhase === 'results' ? 
          (dealerAce && dealerAceScore <= 21 ? dealerAceScore : dealerScore) : '?'})</p>
        <div className="hand">
          {dealerHand.map((c, index) =>
            index === 0 || gamePhase === 'results' || gamePhase === 'dealer' ? (
              <Card key={index} card={cardData[c]} />
            ) : (
              <Card key={index} card={{ img: './cards/back.svg' }} />
            )
          )}
        </div>
      </div>
      
      {/* Player's hands */}
      <div className="player-hands">
        {playerHands.map((hand, handIndex) => (
          <div 
            key={handIndex} 
            className={`player-hand ${activeHandIndex === handIndex && gamePhase === 'playing' ? 'active-hand' : ''}`}
          >
            <div className="hand-header">
              <p>Hand {handIndex + 1} 
                {hand.score > 0 && ` (${hand.hasAce && hand.aceScore <= 21 ? 
                  `${hand.score}/${hand.aceScore}` : hand.score})`}
              </p>
              
              {gamePhase === 'betting' && (
                <>
                  {!hand.betConfirmed ? (
                    <div className="bet-controls">
                      <input
                        type="number"
                        min="1"
                        max={money}
                        value={hand.bet}
                        onChange={(e) => updateBet(handIndex, parseInt(e.target.value) || 0)}
                        disabled={hand.betConfirmed}
                      />
                      <button 
                        onClick={() => confirmBet(handIndex)}
                        disabled={hand.bet <= 0}
                      >
                        Confirm Bet
                      </button>
                    </div>
                  ) : (
                    <p>Bet: ${hand.bet}</p>
                  )}
                </>
              )}
              
              {gamePhase !== 'betting' && (
                <p>Bet: ${hand.bet}</p>
              )}
              
              {gamePhase === 'results' && hand.result && (
                <p className={`result ${hand.result}`}>
                  {hand.result === 'blackjack' ? 'Blackjack!' :
                   hand.result === 'win' ? 'You won!' :
                   hand.result === 'lose' ? 'You lost!' : 'Push'}
                </p>
              )}
            </div>
            
            <div className="cards">
              {hand.cards.map((c, cardIndex) => (
                <Card key={cardIndex} card={cardData[c]} />
              ))}
            </div>
            
            {gamePhase === 'playing' && activeHandIndex === handIndex && !hand.finished && (
              <div className="hand-controls">
                <button onClick={hit}>Hit</button>
                <button onClick={stand}>Stand</button>
              </div>
            )}
            
            {gamePhase === 'betting' && (
              <div className="hand-management">
                {handIndex === playerHands.length - 1 && playerHands.length < 3 && (
                  <button onClick={addHand}>Add Hand</button>
                )}
                {playerHands.length > 1 && !hand.betConfirmed && (
                  <button onClick={() => removeHand(handIndex)}>Remove Hand</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {gamePhase === 'betting' && (
        <div className="game-controls">
          <button 
            onClick={startDeal}
            disabled={!playerHands.every(hand => hand.betConfirmed)}
          >
            Deal Cards
          </button>
        </div>
      )}
      
      {gamePhase === 'results' && (
        <div className="game-controls">
          <button onClick={newRound}>Next Round</button>
        </div>
      )}
    </div>
  );
}

export default App;