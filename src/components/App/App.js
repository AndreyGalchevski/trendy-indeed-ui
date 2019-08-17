import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../Home/Home';
import MonthlyByCountry from '../MonthlyByCountry/MonthlyByCountry';
import YearlyByCountry from '../YearlyByCountry/YearlyByCountry';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/monthly-by-country" component={MonthlyByCountry} />
      <Route path="/yearly-by-country" component={YearlyByCountry} />
    </div>
  );
}

export default App;
