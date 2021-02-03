import React from 'react';
import { Location } from './location';
import { Support } from './support';
import { Link } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <h1>WEATHERJET</h1>
      
      <h3>THE <Link href="https://github.com/samg11/weatherjet" target="_blank">OPEN SOURCE</Link> WEATHER APP FOR THE UNITED STATES</h3>
      <Location />
      
      <div className="footer">
      <Support width="100" />
      </div>
    </div>
  );
}

export default App;
