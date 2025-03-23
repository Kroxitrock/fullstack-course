const CountryDetails = ({country}) => {
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
    </div>
}


export default CountryDetails;