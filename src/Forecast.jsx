import React, { useState, useEffect } from 'react'
import ReactAnimatedWeather from 'react-animated-weather'
import axios from 'axios'
import API_KEY from './apikeys'
import { Search } from 'react-feather'
import GetWeatherIcon from './GetWeatherIcon'

const Forecast = (data) => {

  const [query, setQuery] = useState('')

  const [weather, setWeather] = useState({})

  const [error,setError] = useState('')

  const search = () =>{
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${query ? query : data.city}&appid=${API_KEY}`)
        .then((response) => {
          setWeather(response.data)
          setQuery('')
        })
        .catch((error) => {
          console.log(error)
          setWeather({})
          
          setError({message:'not found', query:query })
          setQuery('')
        })
  }
  
  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  }

  useEffect(() => {
    search(data.city);
  }, []);

  return (
    <div style={{display:'flex', flexDirection:'column',justifyContent:'space-between', alignItems:'center', height:'100%',gap:'20px'}}>
      
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'10px',width:'90%'}}>
        <div style={{padding:'25px 0'}}>
          {" "}
          <ReactAnimatedWeather 
            icon= {typeof weather.main != 'undefined' ? GetWeatherIcon(weather.weather[0].main) : (data.weather)}
            color= {defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
        </div>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center',gap:'20px',width:'100%'}}>
          <h1 style={{fontSize:'45px', fontWeight:'500'}}> {typeof weather.main != 'undefined' ? (weather.weather[0].main) : (data.weather)}</h1>
          <hr />
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <input style={{padding:'5px 10px', fontSize:'18px', width:'70%'}} name='user_city' type="text" placeholder='Enter the city' value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button onClick={ search } ><Search color='white' /></button>
          </div>
        </div>
      </div>

      <div style={{width:'100%', paddingBottom:'10px'}}>
        {typeof weather.main != 'undefined' ? (
          <div style={{padding:'0', margin:'0', display:'flex', flexDirection:'column', gap:'10px'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
              <p style={{fontSize:'25px', fontStretch:'expanded'}}>{weather.name}, {weather.sys.country}</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
            </div>
            <hr />
            <div style={{display:'flex', justifyContent:'space-between', paddingLeft:'20px', paddingRight:'10px'}}>
              <p style={{fontSize:'18px', fontStretch:'expanded'}}>Temperature</p>
              <p style={{fontSize:'18px', fontStretch:'expanded'}}>{(weather.main.temp-273.15).toFixed(1)}&deg;c({weather.weather[0].main})</p>
            </div>
            <hr />
            <div style={{display:'flex', justifyContent:'space-between', paddingLeft:'20px', paddingRight:'10px'}}>
              <p style={{fontSize:'18px', fontStretch:'expanded'}}>Humidity</p>
              <p style={{fontSize:'18px', fontStretch:'expanded'}}>{weather.main.humidity}%</p>
            </div>
            <hr />
            <div style={{display:'flex', justifyContent:'space-between', paddingLeft:'20px', paddingRight:'10px'}}>
              <p style={{fontSize:'18px', fontStretch:'expanded'}}>Visibility</p>
              <p style={{fontSize:'18px', fontStretch:'expanded'}}>{(weather.visibility/1000).toFixed(0)}km</p>
            </div>
            <hr />
            <div style={{display:'flex', justifyContent:'space-between', paddingLeft:'20px', paddingRight:'10px'}}>
              <p style={{fontSize:'18px', fontStretch:'expanded'}}>Wind Speed</p>
              <p style={{fontSize:'18px', fontStretch:'expanded'}}>{weather.wind.speed}km/hr</p>
            </div>
          </div>
        ) :
        (
          <div style={{display:'flex', flexDirection:'column',alignItems:'center', height:'200px',gap:'10px', fontSize:'30px', paddingTop:'30px'}}>
            <p>'{error.query}'</p> <p>{error.message}</p>          
          </div>
        )
        }
      </div> 
    </div>
  )
}

export default Forecast;
