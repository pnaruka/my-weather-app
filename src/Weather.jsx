function Weather({weather}){
    return (
        <div id="resultArea" className="resultArea">
            <div id="weatherType" className="weatherType">
                <img src ={weather.icon} alt={weather.text} />
                <p>{weather.text}</p>
            </div>
            <div id="temperature" className="temperature">
                <p>
                {weather.temp} C
                </p>
            </div>
            <div id="region" className="region">
                <p>{weather.region}</p>
            </div>
        </div>
    )
}

export default Weather;