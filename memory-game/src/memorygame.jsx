export default function MemoryGame() {

    return(
        <>

            {/* title of page */}
            <h1>Memory Match-Up!</h1>


            <div className="setting-title-box">
                <p>Game Settings:</p>
            </div>

            {/* bar with settings. from bootstrap */}
            <div className="settings-box-container">    
                <div class="card">
                    <div class="card-body">
                        
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">

                            {/*difficulty setting*/}
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-diff-tab" data-bs-toggle="pill" data-bs-target="#pills-diff" type="button" role="tab" aria-controls="pills-diff" aria-selected="false">Difficulty</button>
                            </li>

                            {/*theme setting*/}
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-theme-tab" data-bs-toggle="pill" data-bs-target="#pills-theme" type="button" role="tab" aria-controls="pills-theme" aria-selected="false">Profile</button>
                            </li>
                        </ul>

                        {/* what each tab will present */}
                        <div className="tab-content" id="pills-tabContent">

                            {/* difficulty tab */}
                            <div className="tab-pane fade" id="pills-diff" role="tabpanel" aria-labelledby="pills-diff-tab" tabindex="0">
                                <button type="button" className="btn btn-primary">Easy</button>
                                <button type="button" className="btn btn-primary">Medium</button>
                                <button type="button" className="btn btn-primary">Hard</button>
                            </div>
                            
                            {/* theme tab */}
                            <div className="tab-pane fade" id="pills-theme" role="tabpanel" aria-labelledby="pills-theme-tab" tabindex="0">
                                <button type="button" className="btn btn-primary">image1</button>
                                <button type="button" className="btn btn-primary">image2</button>
                                <button type="button" className="btn btn-primary">image3</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}