# 🃏 Blackjack Game

A feature-rich, multi-hand blackjack game built with React. Play with up to 3 hands simultaneously, place bets, and enjoy a complete casino-style blackjack experience in your browser.

![Blackjack Game Screenshot](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/React-18.x-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 Features

### Core Gameplay
- **Classic Blackjack Rules**: Standard 21 gameplay with dealer AI
- **Multi-Hand Support**: Play up to 3 hands simultaneously
- **Smart Ace Handling**: Automatic ace value optimization (1 or 11)
- **Realistic Dealer Logic**: Dealer hits on 16, stands on 17
- **Hidden Dealer Card**: Second dealer card remains hidden until player's turn ends

### Betting System
- **Individual Hand Betting**: Set different bet amounts for each hand
- **Money Management**: Start with $500, track winnings and losses
- **Blackjack Payouts**: 3:2 payout for natural blackjacks
- **Bet Confirmation**: Confirm bets before dealing cards

### Game States
- **Betting Phase**: Place and confirm bets for all hands
- **Playing Phase**: Hit or stand for each hand sequentially
- **Dealer Phase**: Automated dealer play
- **Results Phase**: View outcomes and payouts for all hands

### Visual Features
- **Card Graphics**: Beautiful SVG card designs
- **Active Hand Highlighting**: Clear indication of current active hand
- **Result Display**: Color-coded win/loss/push indicators
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anthonyzhdong/blackjack.git
   cd blackjack/card-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/` (or the URL shown in your terminal)

### Building for Production
```bash
npm run build
```

## 🎯 How to Play

### Starting a Game
1. Click "Add Hand" to create additional hands (up to 3 total)
2. Enter bet amounts for each hand
3. Click "Confirm Bet" for each hand
4. Once all bets are confirmed, cards will be dealt automatically

### Playing Your Hands
1. Each hand is played sequentially
2. The active hand is highlighted in yellow
3. **Hit**: Draw another card
4. **Stand**: End your turn for this hand
5. Goal: Get as close to 21 as possible without going over

### Hand Values
- **Number cards (2-10)**: Face value
- **Face cards (J, Q, K)**: Worth 10 points
- **Aces**: Worth 1 or 11 (automatically optimized)

### Winning Conditions
- **Blackjack**: Ace + 10-value card (pays 3:2)
- **Regular Win**: Higher total than dealer without busting
- **Push**: Same total as dealer (bet returned)
- **Bust**: Total over 21 (automatic loss)

## 🎮 Game Controls

### Main Controls
- **New Round**: Start a new game with current money
- **New Session**: Reset money to $500 and start fresh
- **Add Hand**: Create additional hands (betting phase only)
- **Remove Hand**: Delete a hand (betting phase only)

### Hand Controls
- **Hit**: Draw another card
- **Stand**: End turn for current hand
- **Bet Input**: Enter bet amount (1 to current money)
- **Confirm Bet**: Lock in bet amount

## 🏗️ Technical Details

### Built With
- **React 18**: Modern React with hooks
- **CSS3**: Custom styling with flexbox layout
- **SVG Graphics**: Scalable card images
- **ES6+**: Modern JavaScript features

### Project Structure
```
card-game/
├── src/
│   ├── App.jsx          # Main game component
│   ├── App.css          # Game styling
│   ├── Card.jsx         # Card display component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── public/
│   └── cards/           # Card image assets
├── package.json
└── README.md
```

### Key Components
- **App.jsx**: Main game logic and state management
- **Card.jsx**: Individual card rendering component
- **App.css**: Comprehensive styling for all game elements

## 🐛 Known Issues & Development Status

This game is currently **in development**. Some features may be incomplete or have minor bugs.

### Current Limitations
- Card assets must be properly linked
- No save/load game functionality
- No betting history tracking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2024 Anthony Dong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

## 📧 Contact

**Anthony Dong** - [anthonyzhdong@gmail.com](mailto:anthonyzhdong@gmail.com)

Project Link: [https://github.com/anthonyzhdong/blackjack](https://github.com/anthonyzhdong/blackjack)

---

### 🎲 Game Statistics
- **Hands per Session**: Up to 3 simultaneous hands
- **Starting Money**: $500
- **Blackjack Payout**: 3:2 (150% of bet)
- **Regular Win Payout**: 1:1 (100% of bet)
- **Deck**: Standard 52-card deck with all suits

Enjoy playing blackjack! 🎰