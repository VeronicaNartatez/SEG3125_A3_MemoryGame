import './memorygame.css'
import starPic from './assets/star.png';
import chocoPic from './assets/chocolate.png';
import flowerPic from './assets/flower.png';

export default function MemoryGame() {

    return (
        <>

            <div className="body">
                {/* title of page */}
                <div className="title-container">
                    <h1>Memory Match-Up!</h1>
                </div>


                <div className="setting-title-box">
                    <p>Game Settings:</p>
                </div>

                {/* bar with settings. from bootstrap */}
                <div className="settings-box-container">
                    <div class="card">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">

                            {/* difficulty tab */}
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="diff-tab" data-bs-toggle="tab" data-bs-target="#diff-tab-pane" type="button" role="tab" aria-controls="diff-tab-pane" aria-selected="true">Difficulty</button>
                            </li>

                            {/* theme tab */}
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="theme-tab" data-bs-toggle="tab" data-bs-target="#theme-tab-pane" type="button" role="tab" aria-controls="theme-tab-pane" aria-selected="false">Themes</button>
                            </li>
                        </ul>

                        {/* what each tab will present */}
                        <div className="tab-content" id="myTabContent">

                            {/* difficulty tab content*/}
                            <div className="tab-pane fade show active" id="diff-tab-pane" role="tabpanel" aria-labelledby="diff-tab" tabindex="0">
                                <div className="diff-btn-container">
                                    {['easy','medium','hard'].map((level) => (
                                        <button 
                                            key={level} 
                                            type='button' 
                                            className={`btn-diff ${difficulty === level ? 'selected' : ''}`}
                                            onClick={() => setDifficulty(level)}
                                        >
                                            {level.charAt(0).toUpperCase()+level.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* theme tab content*/}
                            <div className="tab-pane fade" id="theme-tab-pane" role="tabpanel" aria-labelledby="theme-tab" tabindex="0">
                                <div className="theme-btn-container">

                                    <button type="button" class="btn-theme" id='space'>
                                        <div className="starcard">
                                            <img id='star-pic' src={starPic} alt="Star Emoji" />
                                        </div>
                                    </button>

                                    <button type="button" class="btn-theme" id='food'>
                                        <div className="food-theme">
                                            <img id='choco-pic' src={chocoPic} alt='Chocolate emoji' />
                                        </div>
                                    </button>
                                    <button type="button" class="btn-theme" id='plants'>
                                        <div className="plant-theme">
                                            <img id='plant-pic' src={flowerPic} alt='Flower emoji' />
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="restart-container">
                    <button id='restart-btn'>Restart</button>
                </div>
            </div>

            
        </>
    )
}