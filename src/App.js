import React from 'react';
import { Location } from './location';
import { Support } from './support';

function App() {
  return (
    <div className="App">
      <h1>Weatherjet</h1>
      <h3>The open source Weather App for the United States</h3>
      <Location />
      
      <div className="footer">
      <Support width="100" />
      </div>
    </div>
  );
}

export default App;
