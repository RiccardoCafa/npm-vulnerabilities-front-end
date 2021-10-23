import React, {useState, useEffect} from 'react';

import { useHistory, useParams } from 'react-router-dom';

import '../../Sass/pages/Cyber.sass';

interface RouteParams {
    apiKey: string;
}

export default function CyberMenu() {

    const [apiKey, setApiKey] = useState('');

    const params = useParams<RouteParams>();
    const history = useHistory();

    useEffect(() => {
        setApiKey(params.apiKey);

        if (!params.apiKey) {
            // history.push('keyselection/cyber');
        }
    }, []);

    return (
        <div className="Container">
            framework
        </div>
    )
}