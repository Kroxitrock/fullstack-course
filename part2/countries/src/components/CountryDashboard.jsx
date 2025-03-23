import {useEffect, useState} from "react";
import CountryDetails from "./CountryDetails.jsx";

const CountryDashboard = ({countryQuery = '', countries = []}) => {
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        setFilteredCountries(countries.filter(country => country.name.common
            .toLowerCase().includes(countryQuery.toLowerCase())));
    }, [countries, countryQuery]);

    if (filteredCountries.length > 10) {
        return <p> Too many matches, specify another filter </p>
    }

    if (filteredCountries.length === 1) {
        return (<CountryDetails country={filteredCountries[0]}></CountryDetails>);
    }

    return <>
        {filteredCountries.map((country) => (<p key={country.cca3}>{country.name.common}</p>))}
    </>
}

export default CountryDashboard;