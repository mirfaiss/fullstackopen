import axios from "axios"
import { useEffect, useState } from "react"

const ViewCountry = ({ fetched }) => {

    const [dataWeather, setDataWeather] = useState(null)
    const [temperature, setTemperature] = useState(null)
    const [urlIcon, setUrlIcon] = useState(null)
    const [wind, setWind] = useState(null)

    const api_key = process.env.REACT_APP_API_KEY

    const countryName = fetched.map(x => x.name.common)
    const capital = fetched.map(x => x.capital)
    const area = fetched.map(x => x.area)


    // Get list Language
    const languages = fetched.map(x => x.languages)
    const languagesObj = languages[0]
    const valueLanguagesObj = Object.values(languagesObj)

    // Get flag
    const flag = fetched.map(x => x.flags)
    const flagObj = flag[0]
    const flagSrc = flagObj.png

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
        <>
            <h1>{countryName}</h1>
            <p>
                Capital : {capital} <br />
                Area : {area}
            </p>

            <h3>Languages</h3>
            <ul>
                {valueLanguagesObj.map(x => <li key={x}>{x}</li>)}
            </ul>

            <img className='flag' src={flagSrc} alt={flagSrc} />

            <h2>Weather in {capital} </h2>
            <p>Temperature {temperature} celcius</p>

            <img src={urlIcon} alt={urlIcon} />
            <p>Wind {wind} m/s</p>



            {console.log('fetched :', fetched)}
            {console.log('data Weather :', dataWeather)}
            {console.log('url icon :', urlIcon)}
            {console.log('wind =>', wind)}



        </>
    )
}

export default ViewCountry