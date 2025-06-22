import { useState, useEffect } from "react";
import './memorygame.css';

//diff levels of game
const difficulties = {
    easy: { pairs: 4, cols: 4, rows: 2 },
    medium: { pairs: 8, cols: 4, rows: 4 },
    hard: { pairs: 12, cols: 6, rows: 4 }
};

//the themes of game
const themes = {
    space: {
        emojis: ['🚀', '🪐', '👽', '🌌', '⭐️', '☄️', '🛰️', '🛸', '🌠', '🪄', '🧑‍🚀', '🌙'],
        color: 'space-card'
    },
    plants: {
        emojis: ['🌿', '🌵', '🌷', '🍃', '🍄', '🌹', '🌴', '🌳', '🌻', '🌼', '🪴', '🌺'],
        color: 'plant-card'
    },
    candy: {
        emojis: ['🍬', '🍫', '🍭', '🍩', '🧁', '🍪', '🍰', '🥧', '🍮', '🍯', '🍡', '🍨'],
        color: 'food-card'
    }
};

//default settings to game
export default function MemoryGame() {
    const [theme, setTheme] = useState('space');
    const [difficulty, setDifficulty] = useState('easy');
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);

    const [showWin, setShowWin] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    

    // generates the cards
    function generateCards() {
        const {emojis}=themes[theme];
        const {pairs}= difficulties[difficulty];
        const selected=emojis.slice(0, pairs);
        const shuffled=shuffle([...selected, ...selected]);

        setCards(shuffled.map((emoji, i) => ({ id: i, emoji, isFlipped: false })));
        setFlipped([]);
        setMatched([]);
        setShowWin(false);
    };

    // shuffles the cards
    function shuffle(arr) {
        const a=[...arr];
        for (let i=a.length-1; i>0;i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i],a[j]]=[a[j],a[i]]; 
        }
        return a;
    };

    //display the card
    function matchCheck(index) {
        if(flipped.length===2 || flipped.includes(index) || matched.includes(index)) {
            return;
        }

        const newFlipped=[...flipped,index];
        setFlipped(newFlipped);

        if(newFlipped.length===2) {
            const [i1,i2]=newFlipped;
            
            //make a new array if the cards match and add the
            if(cards[i1].emoji===cards[i2].emoji){
                setMatched([...matched,i1,i2]);
            }
            setTimeout(() => setFlipped([]),1000)
        }
    }

    //generate cards based on theme or difficulty change
    useEffect(() => {
        generateCards();
    }, [theme, difficulty]);

    useEffect(() => {
        const totalCards = difficulties[difficulty].pairs * 2;
        if (matched.length === totalCards) {
            setTimeout(() => {
                setShowWin(true);
            }, 500);
        }
    }, [matched, difficulty]);
    

    function renderedCard(card, index){
        const isFlipped=flipped.includes(index) || matched.includes(index);
        return (
            
            <div className="card-wrapper" key={card.id} onClick={() => matchCheck(index)}>
                <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>

                    <div className={`card-front ${themes[theme].color}`}>
                        ?
                    </div>

                    <div className="card-back">
                        {card.emoji}
                    </div>
                </div>
          </div>
        );
    }

    return (
        <div className="body">
            <div className="title-container"><h1>Memory Match-Up!</h1></div>
            <div className="settings-box-container">
                <div className="card">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button className="nav-link active">Difficulty and Theme Settings</button>
                        </li>
                    </ul>
                    <div className="diff-btn-container" >
                        {Object.keys(difficulties).map(level => (
                            <button
                                key={level}
                                className={`btn-diff ${level}-btn ${difficulty === level ? 'selected' : ''}`}
                                onClick={() => setDifficulty(level)}
                            >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="theme-btn-container">
                        {Object.keys(themes).map(t => (
                            <button
                                key={t}
                                className={`btn-theme ${t}-btn ${theme === t ? 'selected' : ''}`}
                                onClick={() => setTheme(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="reset-btn-container">
                    <button className="reset-btn" onClick={generateCards}>Reset Game</button>
            </div>

            <div
                className="card-grid"
                style={{
                    gridTemplateColumns: `repeat(${difficulties[difficulty].cols}, 1fr)`,
                    gridTemplateRows: `repeat(${difficulties[difficulty].rows}, 1fr)`,
                }}
            >
                {cards.map((card, index) => renderedCard(card, index))}
            </div>

            {/* win window */}
            {showWin && (
                <div className="win-popup">
                    <div className="popup-content">
                        <h2>You Won!</h2>
                        <button onClick={() => setShowWin(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}