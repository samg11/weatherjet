// https://api.weather.gov/points/[location]/forecast
import { useState, useEffect } from 'react';

export function WeatherData({ location, ready }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState('nr');
    const [items, setItems] = useState([]);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {

        fetch(`https://api.weather.gov/points/${location}/forecast`)
        .then(res => res.json())
        .then(
        (result) => {
            setIsLoaded(true);
            setItems(result.properties.periods)
            console.log(result)
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
        <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
      );
    }
  }