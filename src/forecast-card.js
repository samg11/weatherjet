export default function ForecastCard({ data, showNight }) {
    const lowerName  = data.name.toLowerCase()
    const lowerNight = lowerName.split(' ')[1]
    console.table([lowerName.split(' ')[1], lowerName.split(' ')[1] === 'night'])
    if ((!showNight && lowerNight !== 'night' && lowerName !== 'tonight') || showNight){
        return (
            <div className="forecast-card">
                <h4>{data.name}</h4>
            </div>
        )
    } else {
        return <div></div>
    }
}