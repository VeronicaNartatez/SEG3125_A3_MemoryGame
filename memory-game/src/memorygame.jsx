
import { useState, useEffect } from "react";
import './memorygame.css';

//themes
const themes={
    space: {
        emojis: ['🚀', '🪐', '👽', '🌌', '⭐️', '☄️', '🛰️', '🛸', '🌠', '🪄', '🧑‍🚀', '🌙'],
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

//difficulties
const difficulties={
    easy:{pairs: 4, cols:4,rows:2},
    medium:{pairs: 8, cols:4,rows:4},
    hard:{pairs: 12, cols:6,rows:4}
};


export default function MemoryGame(){
    //will put html in here from main branch

    const [theme,setTheme]=useState('space');
    const [difficulty,setDifficulty]=useState('easy')]
    const [cards,setCards]=useState([]);
    const [flipped,setFlipped]=useState([]);
    const [matched,setMatched]=useState([]);

    useEffect(() =>{
        generateCards();
    }, [theme,difficulty]);

    //when we wanna restart
    const generateCards = () => {
        const{emojis}=themes[theme];
        const{pairs} = difficulties[difficulty];
        const selected=emojis.slice(0,pairs);
        const shuffled=shuffle([...selected,...selected]);
        
        //when cards are generated, this will be default setting
        //page refresh/ game restarts, these are the state of the cards
        setCards(shuffled.map((emoji,i) => ({id:i,emoji,flipped: false})));
        setFlipped([]);
        setMatched([]);
    };

    //shuffle cards so theyre random
    function shuffle(arr) {
        const a=[...arr];
        
        for(let i = a.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [a[i], a[j] = a[j],a[i]];
        }
        return a;
    };


    function handleFlip(index){

        if (flipped.length===2 || flipped.includes(index) || matched.includes(index)){
            return;
        }

        const newFlipped=[...flipped,index];
        setFlipped(newFlipped);

        if (newFlipped.length===2){
            const[i1,i2] = newFlipped;

            if (cards[i1].emoji === cards[i2].emoji) {
                setMatched([...matched,i1,i2]);
                setTimeout(() => setFlipped([]), 1000);

            } else {
                setTimeout(() => setFlipped([]),1000);
            }
        }
    };

    function renderCard(card,index) {
        const renderCard = flipped.includes(index) || matched.includes(index);

        return(
            <div className="body">
      <div className="title-container"><h1>Memory Match-Up!</h1></div>

      <div className="setting-title-box"><p>Game Settings:</p></div>

      <div className="settings-box-container">
        <div className="card">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button className="nav-link active" data-bs-toggle="tab">Difficulty</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab">Themes</button>
            </li>
          </ul>
          <div className="tab-content">
            <div className="diff-btn-container">
              {Object.keys(difficulties).map(level => (
                <button
                  key={level}
                  className={`btn-diff ${difficulty === level ? 'selected' : ''}`}
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
                  className={`btn-theme ${theme === t ? 'selected' : ''}`}
                  onClick={() => setTheme(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Card grid */}
      <div
        className="card-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${difficulties[difficulty].cols}, 1fr)`,
          gridTemplateRows: `repeat(${difficulties[difficulty].rows}, 1fr)`,
          gap: '10px',
          padding: '20px',
        }}
      >
        {cards.map(renderCard)}
      </div>
    </div>
            
        )
    }
}
