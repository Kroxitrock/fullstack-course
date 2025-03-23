import {useEffect, useState} from "react";
import axios from "axios";

const CountryDetails = ({country}) => {

    const [weather, setWeather] = useState(null);
    const api_key = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
            });
    });

    return <div key={country.name.common}>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
            ))}
        </ul>
        <img src={country.flags.png} alt={country.name} style={{width: 100, height: 100}}/>
        <h2>Weather in {country.capital[0]}</h2>
        {weather && <p>Temperature: {weather.current.temp}°C</p>}
        {weather && <img src={`http://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`} alt="weather icon"/>}
        {weather && <p>Wind: {weather.current.wind_speed} m/s</p>}
    </div>
}


export default CountryDetails;