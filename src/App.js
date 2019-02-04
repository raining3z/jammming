import React, { Component } from 'react';
//import logo from './logo.svg';
import './reset.css';
import './App.css';
import Header from './components/Layout/Header';
import Tracks from './components/Tracks/Tracks';
class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Tracks />
			</div>
		);
	}
}

export default App;
