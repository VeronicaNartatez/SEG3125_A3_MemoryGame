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
const difficulty={
    easy:{pairs: 4, cols:4,rows:2},
    medium:{pairs: 8, cols:4,rows:4},
    hard:{pairs: 12, cols:6,rows:4}
};


