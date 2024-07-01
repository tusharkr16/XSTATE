import React, { useState, useEffect } from 'react';

const State = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        fetch('https://crio-location-selector.onrender.com/countries')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                .then(response => response.json())
                .then(data => setStates(data))
                .catch(error => console.error('Error fetching states:', error));
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
                .then(response => response.json())
                .then(data => setCities(data))
                .catch(error => console.error('Error fetching cities:', error));
        }
    }, [selectedCountry, selectedState]);

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedState('');
        setSelectedCity('');
        setStates([]);
        setCities([]);
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSelectedCity('');
        setCities([]);
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    return (
        <div>
            <h1>Location Selector</h1>
            <div>
                <label htmlFor="country">Select Country:</label>
                <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="" disabled>Select Country</option>
                    {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="state">Select State:</label>
                <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                    <option value="" disabled>Select State</option>
                    {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="city">Select City:</label>
                <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
                    <option value="" disabled>Select City</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            {selectedCountry && selectedState && selectedCity && (
                <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
            )}
        </div>
    );
}

export default State