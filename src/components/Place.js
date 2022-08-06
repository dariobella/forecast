import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Day} from "./Day";
import {SelectedDay} from "./SelectedDay";
import {Search} from "./Search";
import "./Place.css"

export const Place = () => {
    let { place } = useParams()
    const [lat, setLat] = useState(0.0)
    const [lng, setLng] = useState(0.0)
    const [timezone, setTimezone] = useState(0.0)
    const [weatherHourly, setWeatherHourly] = useState([])
    const [weatherDaily, setWeatherDaily] = useState([])
    const [selectedDay, setselectedDay] = useState(0)

    useEffect(() => {
        async function fetchWeather() {
            const requestLatLng = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}&language=it`).then(res => res.json())
            setLat(parseFloat(requestLatLng.results[0].latitude))
            setLng(parseFloat(requestLatLng.results[0].longitude))
            setTimezone(requestLatLng.results[0].timezone)
            if (lat && lng && timezone) {
                const requestWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${timezone}`).then(res => res.json())
                const hourlyAPI = requestWeather.hourly
                const dailyAPI = requestWeather.daily

                let hourly = [[], [], [], [], [], []]
                let i = 0
                for (let j = 0; j < 6; j++) {
                    for (let k = 0; k < 24; k++) {
                        hourly[j][k] = {
                            time: hourlyAPI.time[i].split('T')[1],  // converts from YYYY-MM-DDTHH:MM (API format) to HH:MM format
                            precipitation: hourlyAPI.precipitation[i],
                            T: parseInt(hourlyAPI.temperature_2m[i]),
                            weathercode: hourlyAPI.weathercode[i],
                            wind: hourlyAPI.windspeed_10m[i]
                        }
                        i++
                    }
                }
                setWeatherHourly(hourly)


                let daily = []
                for (let i = 0; i < 6; i++) {
                    daily[i] = {
                        date: dailyAPI.time[i].split('-')[2] + '/' + dailyAPI.time[i].split('-')[1], // converts YYYY-MM-DD (API format) to DD/MM format
                        weathercode: dailyAPI.weathercode[i],
                        maxT: parseInt(dailyAPI.temperature_2m_max[i]),
                        minT: parseInt(dailyAPI.temperature_2m_min[i]),
                    }
                }
                setWeatherDaily(daily)
            }

        }
        fetchWeather()

    }, [place, lat, lng])

    function clickDayBtn(e, i) {
        e.preventDefault()
        setselectedDay(i)
    }

    return (
        <div className="placePage">
            <Search place={place} className={'small'} />
            <div className="days">
                <div className="otherDays">
                    {
                        weatherDaily.map((w, i) => {
                            return  <button key={i} className="dayBtn" onClick={e => clickDayBtn(e, i)}>
                                <Day key={i}
                                     date={w.date}
                                     weathercode={w.weathercode}
                                     maxT={w.maxT}
                                     minT={w.minT}
                                     selected={i === selectedDay ? 'selected' : ''}
                                />
                            </button>
                        })
                    }
                </div>
                <div className="selectedDay">
                    <SelectedDay
                        weather={weatherHourly[selectedDay]}
                    />
                </div>
            </div>
        </div>
    )
}