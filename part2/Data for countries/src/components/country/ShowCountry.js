import axios from "axios"
import { useState, useEffect } from "react"

const ShowCountry = ({ country }) => {

    const api_key = process.env.REACT_APP_API_KEY

    //  Country Data
    const countryName = country.name.common
    const capital = country.capital[0]
    const languages = Object.values(country.languages)
    const area = country.area
    const flag = country.flags.png

    // Data Weather
    const [dataWeather, setDataWeather] = useState(null)
    const [temperature, setTemperature] = useState(null)
    const [urlIcon, setUrlIcon] = useState(null)
    const [wind, setWind] = useState(null)

    // Use Effect
    const hook = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
            .then(res => {
                console.log('weather =>', res.data)
                setDataWeather(res.data)
            })
            .catch(error => console.log('hook =>', error))
    }

    useEffect(hook, [])

    const updateDataWeather = () => {
        if (dataWeather !== null) {

            // Temperature
            setTemperature(dataWeather.main.temp)

            // Icon
            const icon = dataWeather.weather[0].icon
            const urlIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`
            setUrlIcon(urlIcon)

            // Wind speed
            const wind = dataWeather.wind.speed
            setWind(wind)
        }
    }

    useEffect(updateDataWeather, [dataWeather])




    return (
        <div>
            <h1>{countryName}</h1>

            <p>
                Capital : {capital} <br />
                Area : {area}
            </p>

            <h3>Languages</h3>

            <ul>
                {languages.map(x => <li key={x}>{x}</li>)}
            </ul>

            <img className="flag" src={flag} alt={flag} />

            <h2>Weather in {capital} </h2>
            <p>Temperature {temperature} celcius</p>

            <img src={urlIcon} alt={urlIcon} />
            <p>Wind {wind} m/s</p>



            {/* {console.log('country => ', country)} */}
        </div>

    )
}

export default ShowCountry