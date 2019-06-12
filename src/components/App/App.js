import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../Home/Home';
import MonthlyByCountry from '../MonthlyByCountry/MonthlyByCountry';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/monthly-by-country" component={MonthlyByCountry} />
    </div>
  );
}

export default App;
