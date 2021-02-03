import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { useState } from 'react';
import { WeatherData } from './weather_data';

export function Location() {
    const [location, changeLocation] = useState('');
    const [data, changeData] = useState(<div></div>)

    return (
        <div className="location-search">
            <FormControl>
                <InputLabel htmlFor="my-input">Location {"(eg., \"Philly\")"}</InputLabel>
                
                <Input
                    value={location}
                    id="my-input"
                    aria-describedby="Location"
                    onKeyPress={(e) => {if (e.code === 'Enter') {
                        changeData(<p>Loading...</p>)
                        changeData(<WeatherData location={location} />)
                    }}}
                    onChange={(e) => changeLocation(e.target.value)
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
                    changeData(<p>Loading...</p>)
                    changeData(<WeatherData location={location} />)
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