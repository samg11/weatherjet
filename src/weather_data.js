// https://api.weather.gov/points/[location]/forecast
import { useState, useEffect } from 'react';
import ForecastCard from './forecast-card';
import { Box, Button } from '@material-ui/core';
const sFetch = require('sync-fetch')

const GEOCODING_API_KEY = 'AIzaSyB4Q_i_g_dZ0vvhLfTMGHeHmzWZy9ntpoc'

function geocode(address) {
  const link = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GEOCODING_API_KEY}`
  const geocodeReq  = sFetch(link).json().results[0]
  console.log(geocodeReq);
  const formatted   = geocodeReq.formatted_address
  const { lat,lng } = geocodeReq.geometry.location
  console.log(geocodeReq.address_components)

  return [`${lat},${lng}`, formatted]
}

export function WeatherData({ location }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [showNight, changeShowNight] = useState([false, 'Show night']);
    const [noInput, setNoInput] = useState(false);
    const [formattedAddress, changeFormattedAddress] = useState('')

    useEffect(() => {
      if (location !== '') {
        setIsLoaded(false)
        const geocoded = geocode(location)
        changeFormattedAddress(geocoded[1])
        console.log(geocoded)
        fetch(`https://api.weather.gov/points/${geocoded[0]}/forecast`)
        .then(res => res.json())
        .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setItems(result.properties.periods);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
        )
      } else {
        setNoInput(true)
      }
    }, [location])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (noInput) {
      return <p>You must type something for the location</p>
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h2>{formattedAddress}:</h2>
          <Button className="showNightButton" variant="contained" onClick={()=>{
            const msg = !showNight[0] ? "Don't Show Night": "Show Night"
            changeShowNight([!showNight[0], msg])
              
            }
          }>
              {showNight[1]}
          </Button>
          <Box className="weather-data" display="flex" flexWrap="wrap" flexDirection="row">
            {items.map(item => (
              <ForecastCard key={item.name} showNight={showNight[0]} data={item} />
            ))}
          </Box>
        </div>
      );
    }
  }