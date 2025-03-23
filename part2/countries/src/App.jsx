import './App.css'
import {useEffect, useState} from "react";
import CountryDashboard from "./components/CountryDashboard.jsx";
import axios from "axios";

function App() {
    const [countryQuery, setCountryQuery] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then((response) =>
                setCountries(response.data)
            );
    }, []);

    const onInput = (event) => {
        setCountryQuery(event.target.value);
    }

    return (
        <div>
            Find countries: <input type="text" onChange={onInput}/>

            <CountryDashboard countryQuery={countryQuery} countries={countries}></CountryDashboard>
        </div>
    )
}

export default App
