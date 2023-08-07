import React from 'react';
import { BrowserRouter } from "react-router-dom"
import Header from './components/Header';
import Board from './features/game/presentation/Board/Board'
import Keyboard from './features/game/presentation/Board/Keyboard'
import Instructions from './features/instructions/Instructions'
import Statistics from './features/instructions/Statistics'
import Layout from './components/Layout'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Board />
        <Keyboard />
      </Layout>
      <Instructions />
      <Statistics />
    </BrowserRouter>
  );
};

export default App;