import React from 'react';

import '../../Sass/pages/Home.sass';

export default function Home() {

    return (
        <div className="Container">
            <div className="Button-container">
                <button className="Button-pick cyber">
                    cyber security
                </button>
                <button className="Button-pick npm">
                    npm vulnerabilities
                </button>
            </div>
            <div className="Container-Body">
                <h2 className="container-title">Do you have any key? (optional)</h2>
                <input placeholder="your key" className="key-input"></input>
                <a className="start-link">start cyber form -{">"}</a>
            </div>
        </div>
    )
}