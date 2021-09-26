// order to import: CSS, React, node, code, components, assets

import './index.sass'
// React
import React from 'react'
import ReactDOM from 'react-dom'
// components
import App from './Components/React/App'

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
