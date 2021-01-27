import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { useState } from 'react';

export function LocationSearch() {
    const [location, changeLocation] = useState('');

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
                <Button variant="contained" color="primary">
                    Get Weather Data
                </Button>
            </FormControl>
        </div>
    )
}