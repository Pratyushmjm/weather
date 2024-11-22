import React, { useEffect, useState } from "react";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const initialCities = [
    {
      id: 1,
      name: "Kerala",
      currentTemp: 28,
      weatherCondition: "Rainy",
      highTemp: 30,
      lowTemp: 25,
      forecast: [
        { day: "Day 1", temp: 29 },
        { day: "Day 2", temp: 30 },
        { day: "Day 3", temp: 28 },
      ],
      removable: false,
    },
    {
      id: 2,
      name: "Bangalore",
      currentTemp: 22,
      weatherCondition: "Cloudy",
      highTemp: 25,
      lowTemp: 19,
      forecast: [
        { day: "Day 1", temp: 23 },
        { day: "Day 2", temp: 24 },
        { day: "Day 3", temp: 22 },
      ],
      removable: false,
    },
    {
      id: 3,
      name: "Chennai",
      currentTemp: 30,
      weatherCondition: "Humid",
      highTemp: 34,
      lowTemp: 28,
      forecast: [
        { day: "Day 1", temp: 31 },
        { day: "Day 2", temp: 32 },
        { day: "Day 3", temp: 30 },
      ],
      removable: false,
    },
    {
      id: 4,
      name: "Pune",
      currentTemp: 20,
      weatherCondition: "Partly Cloudy",
      highTemp: 23,
      lowTemp: 18,
      forecast: [
        { day: "Day 1", temp: 21 },
        { day: "Day 2", temp: 22 },
        { day: "Day 3", temp: 20 },
      ],
      removable: false,
    },
    {
      id: 5,
      name: "Delhi",
      currentTemp: 24,
      weatherCondition: "Sunny",
      highTemp: 29,
      lowTemp: 19,
      forecast: [
        { day: "Day 1", temp: 25 },
        { day: "Day 2", temp: 28 },
        { day: "Day 3", temp: 24 },
      ],
      removable: false,
    },
  ];

  const [cities, setCities] = useState(initialCities); //Initial Cities added to the list
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const addCity = (newCity) => {
    const cityExists = cities.some(
      (city) => city.name === newCity.name || city.id === newCity.id
    );

    if (!cityExists) {
      setCities((prevCities) => [...prevCities, newCity]);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) return;

    fetch("../utils/mockapi.json")
      .then((response) => response.json())
      .then((data) => {
        const mockCities = data.cities || [];
        const foundCities = mockCities.filter((city) =>
          city.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (foundCities.length > 0) {
          foundCities.forEach((foundCity) => {
            addCity(foundCity);
          });
          setErrorMessage(""); // Clear error if cities are found
        } else {
          setErrorMessage("City not found in the list."); // Set error message if no cities found
        }
      })
      .catch((error) => {
        console.error("Error fetching mock data", error);
        setErrorMessage("Error fetching data.");
      });
  };

  useEffect(() => {
    if (searchQuery === "") {
      setErrorMessage(""); // Reset error message when input is cleared
    }
  }, [searchQuery]);

  const removeCity = (id) => {
    setCities(cities.filter((city) => city.id !== id));
  };

  return (
    <div className="dashboard">
      <h1 className="weather-heading">Weather App</h1>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
      {/* Show error message if any */}
      <div className="city-list">
        {cities.map((city) => (
          <>
            {console.log("ccccc", city)}
            <CityCard
              key={city.id}
              city={city}
              onRemove={removeCity}
              removable={city.removable ? true : false}
              onClick={() => setSelectedCity(city)}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
