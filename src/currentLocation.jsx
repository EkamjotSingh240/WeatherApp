import React from 'react'
import API_KEY from './apikeys'
import Forecast from './Forecast.jsx'
import LiveClock from './liveClock'
import loader from './images/WeatherIcons.gif'
import './App.css'

const datebuilder = (d) => {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day}, ${date} ${month} ${year}`;
}

const defaults = {
  color: "black",
  size: 112,
  animate: true,
};

class Weather extends React.Component {
    state = {
        lat: undefined,
        lon: undefined,
        errorMessage: undefined,
        temperatureC: undefined,
        temperatureF: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: "CLEAR_DAY",
        sunrise: undefined,
        sunset: undefined,
        errorMsg: undefined
    };

    componentDidMount() {
        if (navigator.geolocation){
            this.getPosition()

            .then((position) => {
                this.getWeather(position.coords.latitude, position.coords.longitude)
            })

            .catch((err) => {
                this.getWeather(28.67, 77.22)
                alert("You have disabled location service. Allow 'This APP' to access your location. Your location will be used for calculating real time weather")
            })
        }else{
            alert("Geolocation not available")
        }

        this.timerID = setInterval(
            () => this.getWeather(this.state.lat, this.state.lon), 60000
        )
    }

    componentWillUnmount(){
        clearInterval(this.timerID)
    }

    getPosition = (options) => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve,reject,options)
        })
    }
    
    getWeather = async (lat,lon) => {
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await api_call.json();
        console.log(data)
        this.setState({
            lat: lat,
            lon: lon,
            city: data.name,
            temperatureC: (data.main.temp-273.15).toFixed(1),
            temperatureF: (data.main.temp * 9/5 - 459.67).toFixed(1),
            humidity: data.main.humidity,
            main: data.weather[0].main,
            country: data.sys.country,
        })

        switch(data.weather[0].main){
            case "Clear":
                this.setState({icon: "CLEAR_DAY"})
                break;
            case "Clouds":
                this.setState({icon: "CLOUDY"})
                break;
            case "Rain":
                this.setState({icon: "RAIN"})
                break;
            case "Snow":
                this.setState({icon: "SNOW"})
                break;
            case "Thunderstorm":
                this.setState({icon: "SLEET"})
                break;
            case "Drizzle":
                this.setState({icon: "WIND"})
                break;
            case "Smoke":
                this.setState({icon: "FOG"})
                break;
            case "Fog":
                this.setState({icon: "FOG"})
                break;
            case "Tornado":
                this.setState({icon: "WIND"})
                break;
            case "Haze":
                this.setState({icon: "CLEAR_DAY"})
                break;
            case "Dust":
                this.setState({icon: "WIND"})
                break;
            default:
                this.setState({icon: "CLEAR_DAY"})
        }
    }
    

    render(){
        if(this.state.temperatureC){
            return(
                <React.Fragment>
                    <div className="city" >
                        <div className="title">
                            <h1 style={{fontFamily:'sans-serif', fontSize:'50px'}}>{this.state.city}</h1>
                            <h2 style={{fontFamily:'sans-serif', fontSize:'40px', fontWeight:'600'}}>{this.state.country}</h2>
                        </div>
                        
                        <div className="date-time">
                            <div className="dmy">
                                <div className="current-time">
                                    <LiveClock format={'HH:mm:ss'} ticking={true} interval={1000} timezone={'Asia/Kolkata'} style={{fontSize:'35px', fontFamily:'sans-serif'}}/>
                                </div>
                                <div className="current-date" style={{fontSize:'25px', wordSpacing:'4px', letterSpacing:'1px'}}>
                                    {datebuilder(new Date())}
                                </div>
                            </div>
                            <div className="temperature">
                                <p style={{fontSize:'80px'}}>{this.state.temperatureC}°<span style={{fontSize:'65px'}}>c</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='content2' >
                        <Forecast icons={this.state.icon} weather={this.state.main} city={this.state.city}/>
                    </div>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <div className='loading' style={{display:'flex', flexDirection:'column', width:'60%', padding:'30px', borderRadius:'20px', alignItems:'center', justifyContent:'flex-start'}}>
                        <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
                        <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
                            Detecting your location
                        </h3>
                        <h3 style={{ color: "white", marginTop: "10px" }}>
                            Your current location wil be displayed on the App <br></br> & used
                            for calculating Real time weather.
                        </h3>
                    </div>

                
                </React.Fragment>
            )
        }
    }

}

export default Weather;