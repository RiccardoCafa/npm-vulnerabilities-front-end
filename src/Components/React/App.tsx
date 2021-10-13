import '../Sass/App.sass';
// React
import React from 'react';
import Home from './pages/Home';
import Cyber from './pages/CyberMenu';
import Npm from './pages/Npm';
import NpmDiscover from './pages/NpmDiscover';

import { ChakraProvider } from "@chakra-ui/react"

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

import theme from '../../theme';

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
					<Route path="/cyber">
						<Cyber></Cyber>
					</Route>
					<Route path="/npm">
						<Npm></Npm>
					</Route>
					<Route path="/npmdiscover">
						<NpmDiscover></NpmDiscover>
					</Route>
				</Switch>
			</div>
			</Router>
		</ChakraProvider>
		
	)
}
