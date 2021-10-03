import React, {useState} from 'react';
import { ChangeEvent, ChangeEventHandler } from 'react-router/node_modules/@types/react';

import '../../Sass/pages/Cyber.sass';

export default function CyberMenu() {

    const [key, setKey] = useState('');

    function startCyberClick() {
        console.log(key);
    }

    function yourKeyOnChange(e: HTMLInputElement) {
        setKey(e.value);
    }


    return (
        <div className="Container">
            {/* <div className="Button-container">
                <button className="Button-pick cyber">
                    cyber security
                </button>
                <button className="Button-pick npm">
                    npm vulnerabilities
                </button>
            </div> */}
            <div className="Container-Body">
                <h2 className="container-title">Do you have any key? (optional)</h2>
                <input placeholder="your key" className="key-input" onChange={e => yourKeyOnChange(e.target)}></input>
                <a className="start-link" onClick={startCyberClick}>start cyber form -{">"}</a>
            </div>
        </div>
    )
}