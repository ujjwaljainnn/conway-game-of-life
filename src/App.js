import React, { Component } from 'react';
import './App.css';
import GameOfLife from './components/Logic/GameOfLife';

class App extends Component {

    render() {

        return (
            <div className="App">
                <h1>Conway's Game of Life</h1>
                <GameOfLife />
            </div>
        );
    }
}

export default App;
