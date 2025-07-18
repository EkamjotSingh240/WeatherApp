import React from 'react'

const GetWeatherIcon = (weatherMain) => {
  switch (weatherMain) {
    
            case "Clear":
                return "CLEAR_DAY";
            case "Clouds":
                return "CLOUDY";
            case "Rain":
                return "RAIN";
            case "Snow":
                return "SNOW";
            case "Thunderstorm":
                return "SLEET";
            case "Drizzle":
                return "WIND";
            case "Smoke":
                return "FOG";
            case "Fog":
                return "FOG";
            case "Tornado":
                return "WIND";
            case "Haze":
                return "CLEAR_DAY";
            case "Dust":
                return "WIND";
            default:
                return "CLEAR_DAY";
  }
}

export default GetWeatherIcon
