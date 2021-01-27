import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { useState } from 'react';
import { WeatherData } from './weather_data';

export function Location() {
    const [location, changeLocation] = useState('');
    const [ready, makeReady] = useState(false);
    const [data, changeData] = useState(<div></div>)

    return (
        <div className="location-search">
            <FormControl>
                <InputLabel htmlFor="my-input">Location</InputLabel>
                <Input value={location} id="my-input" aria-describedby="my-helper-text" onChange={
                    (e) => changeLocation(e.target.value)
                } />
                <br />
                <Button variant="contained" color="secondary" onClick={() => {
                    navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude }}) => {
                        changeLocation(`${latitude},${longitude}`)
                    })
                }}>
                    Use Current Location
                </Button>
                <br />
                <Button variant="contained" color="primary" onClick={()=>{
                    makeReady(true)
                    changeData(<WeatherData location={location} ready={ready} />)
                }
                }>
                    Get Weather Data
                </Button>
            </FormControl>
            <div>
                {data}
            </div>
        </div>
    )
}