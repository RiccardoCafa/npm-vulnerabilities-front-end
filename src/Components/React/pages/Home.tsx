import React from 'react';

import '../../Sass/pages/Home.sass';

export default function Home() {

    return (
        <div className="Container">
            <div className="Button-container">
                <button className="Button-pick">
                    cyber security
                </button>
                <button className="Button-pick">
                    npm vulnerabilities
                </button>
            </div>
            <div>
                <h2>Do you have any key? (optional)</h2>
                <input placeholder="your key"></input>
                <a>start cyber form -</a>
            </div>
        </div>
    )
}