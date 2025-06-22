import { useState, useEffect } from "react";
import './memorygame.css';

// --- Themes ---
const themes = {
    space: {
        emojis: ['🚀', '🪐', '👽', '🌌', '⭐️', '☄️', '🛰️', '🛸', '🌠', '�', '🧑‍🚀', '🌙'],
        color: 'bg-indigo-500'
    },
    plants: {
        emojis: ['🌿', '🌵', '🌷', '🍃', '🍄', '🌹', '🌴', '🌳', '🌻', '🌼', '🪴', '🌺'],
        color: 'bg-green-500'
    },
    candy: {
        emojis: ['🍬', '🍫', '🍭', '🍩', '🧁', '🍪', '🍰', '🥧', '🍮', '🍯', '🍡', '🍨'],
        color: 'bg-pink-500'
    }
};

// --- Difficulties ---
const difficulties = {
    easy: { pairs: 4, cols: 4, rows: 2 },
    medium: { pairs: 8, cols: 4, rows: 4 },
    hard: { pairs: 12, cols: 6, rows: 4 }
};

export default function MemoryGame() {
    const [theme, setTheme] = useState('space');
    const [difficulty, setDifficulty] = useState('easy');
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [isChecking, setIsChecking] = useState(false);

    // --- Function to shuffle an array ---
    const shuffle = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]]; // Corrected shuffle logic
        }
        return a;
    };

    // --- Function to generate cards and reset the game ---
    const generateCards = () => {
        const { emojis } = themes[theme];
        const { pairs } = difficulties[difficulty];
        const selected = emojis.slice(0, pairs);
        const shuffled = shuffle([...selected, ...selected]);

        setCards(shuffled.map((emoji, i) => ({ id: i, emoji, isFlipped: false })));
        setFlipped([]);
        setMatched([]);
    };
    
    // --- Generate cards on theme or difficulty change ---
    useEffect(() => {
        generateCards();
    }, [theme, difficulty]);

    // --- Logic to check for matches ---
    useEffect(() => {
        if (flipped.length === 2) {
            setIsChecking(true);
            const [index1, index2] = flipped;
            if (cards[index1].emoji === cards[index2].emoji) {
                setMatched(prev => [...prev, cards[index1].emoji]);
                setFlipped([]);
                setIsChecking(false);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [flipped, cards]);

    // --- Card flip handler ---
    const handleFlip = (index) => {
        if (isChecking || flipped.includes(index) || matched.includes(cards[index].emoji)) {
            return;
        }
        setFlipped(prev => [...prev, index]);
    };

    const isGameWon = matched.length === difficulties[difficulty].pairs && cards.length > 0;

    return (
        <div className="container-fluid">
            <div className="title-container"><h1>Memory Match-Up!</h1></div>
            <div className="setting-title-box"><p>Game Settings:</p></div>

            <div className="settings-box-container">
                <div className="settings-card">
                    <div className="settings-section">
                        <h5>Difficulty</h5>
                        <div className="btn-group" role="group">
                            {Object.keys(difficulties).map(level => (
                                <button
                                    key={level}
                                    type="button"
                                    className={`btn btn-diff ${difficulty === level ? 'selected' : ''}`}
                                    onClick={() => setDifficulty(level)}
                                >
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div className="settings-section">
                        <h5>Themes</h5>
                        <div className="btn-group" role="group">
                            {Object.keys(themes).map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    className={`btn btn-theme ${theme === t ? 'selected' : ''}`}
                                    onClick={() => setTheme(t)}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* --- Win Condition Modal --- */}
            {isGameWon && (
                 <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>You Win!</h2>
                        <p>Congratulations, you matched all the cards!</p>
                        <button className="play-again-btn" onClick={generateCards}>
                            Play Again
                        </button>
                    </div>
                </div>
            )}

            <div
                className="card-grid"
                style={{
                    gridTemplateColumns: `repeat(${difficulties[difficulty].cols}, 1fr)`,
                }}
            >
                {cards.map((card, index) => {
                     const isFlipped = flipped.includes(index) || matched.includes(card.emoji);
                     return (
                        <div className="card-wrapper" key={index} onClick={() => handleFlip(index)}>
                            <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
                                <div className="card-front">?</div>
                                <div className={`card-back ${themes[theme].color}`}>
                                    {card.emoji}
                                </div>
                            </div>
                        </div>
                     );
                })}
            </div>
        </div>
    );
}
