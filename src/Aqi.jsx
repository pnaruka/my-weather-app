function Aqi({aqi_data}) {
    return (
        <div id="aqiArea" className="aqiArea">
            <p id="pm2_5">PM 2.5: {aqi_data.pm2_5}</p>
            <p id="pm10">PM 10 : {aqi_data.pm10}</p>
        </div>
    );
}

export default Aqi;