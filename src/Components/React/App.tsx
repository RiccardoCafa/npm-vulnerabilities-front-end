import '../Sass/App.sass';
// React
import React from 'react';
import Home from './pages/Home';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from 'react-router-dom';

export default function App() {
	
	return (
		<Router>
		<div className="Menu-nav" >
			{/* A <Switch> looks through its children <Route>s and
				renders the first one that matches the current URL. */}
			<Switch>
				<Route path="/Home">
					<Home />
				</Route>
			</Switch>
		</div>
		</Router>
	)
}
