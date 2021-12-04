import '../Sass/App.sass';
// React
import React from 'react';
import Home from './pages/Home';
import Cyber from './pages/CyberFramework';
import KeySelection from './pages/KeySelection';
import Npm from './pages/Npm';

import { ChakraProvider } from "@chakra-ui/react"

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

import theme from '../../theme';
import CyberResult from './pages/CyberResult';
import CyberChoose from './pages/CyberChoose';

export default function App() {
	
	return (
		<ChakraProvider theme={theme}>
			<Router>
			<div className="Menu-nav" style={{height: '100%'}}>
				{/* A <Switch> looks through its children <Route>s and
					renders the first one that matches the current URL. */}
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/keyselection/:flow">
						<KeySelection></KeySelection>
					</Route>
					<Route exact path="/cyber/:apiKey">
						<Cyber></Cyber>
					</Route>
					<Route path="/npm/:apiKey?">
						<Npm></Npm>
					</Route>
					<Route path="/cyber/result/:apiKey?">
						<CyberResult></CyberResult>
					</Route>
					<Route path="/cyberchoose/:apiKey?">
						<CyberChoose></CyberChoose>
					</Route>
				</Switch>
			</div>
			</Router>
		</ChakraProvider>
		
	)
}
