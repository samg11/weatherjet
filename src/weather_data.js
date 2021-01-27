// https://api.weather.gov/points/[location]/forecast
import { useState, useEffect } from 'react';
import ForecastCard from './forecast-card';
import { Box, Button } from '@material-ui/core';


export function WeatherData({ location, ready }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState('nr');
    const [items, setItems] = useState([]);
    const [showNight, changeShowNight] = useState([false, 'Show night']);

    useEffect(() => {

        fetch(`https://api.weather.gov/points/${location}/forecast`)
        .then(res => {
          return res.json()
        })
        .then(
        (result) => {
            setIsLoaded(true);
            console.log(result)
            setItems(result.properties.periods)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (isLoaded === 'nr') {
        return <p>Choose a location</p>
    } else {
      return (
        <div className="weather-data">
          <Box display="flex" flexWrap="wrap" flexDirection="row">
            {items.map(item => (
              <ForecastCard key={item.name} showNight={showNight[0]} data={item} />
            ))}
          </Box>
          <Button variant="contained" onClick={()=>{
            const msg = !showNight[0] ? "Don't Show Night": "Show Night"
            changeShowNight([!showNight[0], msg])
              
            }
          }>
              {showNight[1]}
          </Button>
        </div>
      );
    }
  }