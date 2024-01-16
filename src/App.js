import React from "react";
import { useState, useEffect } from "react";
import Weather from "./Weather";
import './App.css'
import { createClient } from 'pexels';
import Aqi from "./Aqi";
import Spinner from "./Spinner";

const API_URL = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}`;
const client = createClient(process.env.REACT_APP_IMG_API);
//const query = 'Nature';

function App() {
    const [currentCity, setCurrentCity] = useState('');
    const [currentWeather, setCurrentWeather] = useState({});
    const [currentImage, setCurrentImage] = useState({});
    const [aqi, setAqi] = useState('yes');
    const [imgLoading, setImgLoading] = useState(false);

    useEffect(() => {
        async function fetchImage() {
            let query;
            if (currentWeather.text) {
                query = currentWeather.text + " weather";
                setImgLoading(true);
                const image_res = await client.photos.search({ query, per_page: 5, orientation: 'square' });
                const photos = image_res.photos;
                const data = photos[Math.floor((Math.random() * photos.length))];
                console.log(query);
                console.log(data);
                const image = {
                    "alt": data.alt,
                    "src": data.src.original
                }
                //console.log(image);
                setCurrentImage(image);
                setImgLoading(false);
            }

        } fetchImage();
    }, [currentWeather]);

    useEffect(() => {
        if (aqi === 'no')
            document.getElementById('aqiButton').style.backgroundColor = "red";
        else
            document.getElementById('aqiButton').style.backgroundColor = "#04AA6D";
    }, [aqi]);


    const createWeatherProp = (weather) => {
        const region = !(weather.location.region === "" || weather.location.region === "N/A") ? (weather.location.region + ', ') : "";
        const newWeather = {
            "name": weather.location.name,
            "text": weather.current.condition.text,
            "icon": weather.current.condition.icon,
            "temp": weather.current.temp_c,
            "country": weather.location.country,
            "region": region + weather.location.country,
            "aqi": weather.current.air_quality
        };
        //console.log(newWeather);
        setCurrentWeather(newWeather);
        // searchImage(newWeather.text+" weather");
    }
    const searchWeather = async (city) => {
        const response = await fetch(`${API_URL}&q=${city}&aqi=yes`);
        const data = await response.json();
        //console.log(data);
        if (!data.error) {
            createWeatherProp(data);
        }
        else
            setCurrentWeather({});
    }
    return (
        <div id="appContainer" className="appContainer">
            <div id="header" className="header">
                <h2 className="heading">Weather App</h2>
            </div>
            <div id="appArea" className="appArea">
                <div id="searchArea" className="searchArea">
                    <input id="cityInput"
                        placeholder="Enter city"
                        value={currentCity}
                        onChange={(e) => { setCurrentCity(e.target.value) }}
                    />
                    <input type="button" value="AQI" id="aqiButton" className="green" onClick={() => { setAqi(aqi === 'yes' ? 'no' : 'yes') }} />
                    <input type="button" value="Go" id="searchButton" onClick={() => { searchWeather(currentCity) }} />

                    {/* Add AQI button */}
                </div>
                <div id="result" className="result">
                    {
                        currentWeather["temp"] ? (
                            <Weather weather={currentWeather} />
                        ) : (
                            <div>
                            </div>
                        )
                    }

                    {
                        aqi === 'yes' && currentWeather.aqi ? (
                            <Aqi aqi_data={currentWeather.aqi} />
                        ) : (
                            <></>
                        )
                    }

                </div>


            </div>
            <div id="imgContainer" className="imgContainer">
                {
                    imgLoading ? (
                        <Spinner />
                    ) : (
                        <img id="weatherImage" className="weatherImage" alt={currentImage.alt} src={currentImage.src} />
                    )
                }
                
            </div>
        </div>
    )
}

export default App;