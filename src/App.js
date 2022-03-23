import './App.css';
import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Board from './components/Board';
import PlayerTurn from './components/PlayerTurn';

function App() {
  return (
    <>
      <Header />

      <Board />
      <div className="winning-message" id="winningMessage">
        <div id="winningMessageText"></div>
        
      </div>



      <Footer />

    </>
  )
}

export default App;
