export default function ForecastCard({ data, showNight }) {
    const lowerName  = data.name.toLowerCase()
    const lowerNight = lowerName.split(' ')[1]
    if ((!showNight && lowerNight !== 'night' && lowerName !== 'tonight') || showNight){
        return (
            <div className="forecast-card">
                <h4>{data.name}</h4>
                <h2>{data.temperature} ° {data.temperatureUnit}</h2>
                <p>{data.detailedForecast}</p>
            </div>
        )
    } else {
        return <div></div>
    }
}