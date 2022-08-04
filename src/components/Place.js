import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Day} from "./Day";
import {Today} from "./Today";
import "./Place.css"

export const Place = () => {
    let { place } = useParams()
    const [lat, setLat] = useState(0.0)
    const [lng, setLng] = useState(0.0)
    const [weather, setWeather] = useState([])

    useEffect(() => {
        async function fetchWeather() {
            const requestLatLng = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}&language=it`).then(res => res.json())
            setLat(parseFloat(requestLatLng.results[0].latitude))
            setLng(parseFloat(requestLatLng.results[0].longitude))
            const requestWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin`).then(res => res.json())
            const weatherAPI = requestWeather.daily

            let myWeather = []
            for (let i = 0; i < 6; i++) {
                myWeather[i] = {
                    date: weatherAPI.time[i],
                    weathercode: weatherAPI.weathercode[i],
                    maxT: weatherAPI.temperature_2m_max[i],
                    minT: weatherAPI.temperature_2m_min[i],
                }
            }

            setWeather(myWeather)

        }
        fetchWeather()

    }, [place, lat, lng])

    return (
        <div className="placePage">
            <h1>{place}</h1>
            <div className="today">
                {
                    weather.map((w, i) => {
                        if (i === 0) {
                            return  <Today key={i}
                                         date={weather[i].date}
                                         weathercode={weather[i].weathercode}
                                         maxT={weather[i].maxT}
                                         minT={weather[i].minT}
                                    />
                        }
                    })
                }
            </div>
            <div className="nextDays">
                {
                    weather.map((w, i) => {
                        if (i === 0) {
                            // pass
                        }
                        else {
                            return  <Day key={i}
                                        date={weather[i].date}
                                        weathercode={weather[i].weathercode}
                                        maxT={weather[i].maxT}
                                        minT={weather[i].minT}
                                    />
                        }
                    })
                }
            </div>
        </div>
    )
}