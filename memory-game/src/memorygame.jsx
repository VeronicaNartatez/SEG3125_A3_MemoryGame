import './memorygame.css'
import starPic from './assets/star.png';
import plantPic from './assets/flower.png';
import foodPic from './assets/chocolate.png';

export default function MemoryGame() {

    return(
        <>

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
                                <button type="button" class="btn-diff" id='easy'>Easy</button>
                                <button type="button" class="btn-diff" id='medium'>Medium</button>
                                <button type="button" class="btn-diff" id='hard'>Hard</button>
                            </div>
                        </div>

                        {/* theme tab content*/}
                        <div className="tab-pane fade" id="theme-tab-pane" role="tabpanel" aria-labelledby="theme-tab" tabindex="0">
                            <div className="theme-btn-container">

                                <button type="button" class="btn-theme" id='space'>
                                    <div className="starcard">
                                        <img id='star-pic' src={starPic} alt="Star Emoji"/>
                                    </div>
                                </button>

                                <button type="button" class="btn-theme" id='plants'>
                                    <div className="plantcard">
                                        <img id='plant-pic' src={plantPic} alt='Flower Emoji'/>
                                    </div>
                                </button>
                                
                                <button type="button" class="btn-theme" id='food'>
                                    <div className="foodcard">
                                        <img id='food-pic' src={foodPic} alt="Chocolate Emoji"/>
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}