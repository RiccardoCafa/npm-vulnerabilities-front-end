// order to import: CSS, React, node, code, components, assets

import './index.sass'
// React
import React from 'react'
import ReactDOM from 'react-dom'
// components
import App from './Components/React/App'
import theme from "./theme"
import { ColorModeScript } from '@chakra-ui/react'

ReactDOM.render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
