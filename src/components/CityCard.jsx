import React from 'react';

const CityCard = (props) => {
  const { city, onRemove, removable } = props
  console.log("props---", props);
  
  return (
    <div className="city-card">
      <h2>{city.name}</h2>
      <p>Current: {city.currentTemp}°C, {city.weatherCondition}</p>
      <p>High: {city.highTemp}°C, Low: {city.lowTemp}°C</p>
      <h4>3-Day Forecast:</h4>
      <ul>
        {city.forecast.map((day, index) => (
          <li key={index}>{day.day}: {day.temp}°C</li>
        ))}
      </ul>
      {removable ? <button onClick={() => onRemove(city.id)} className='removeBtn'>Remove</button> : null}
    </div>
  );
};

export default CityCard;
