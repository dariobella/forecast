import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Day} from "./Day";
import {SelectedDay} from "./SelectedDay";
import "./Place.css"
import {Search} from "./Search";

export const Place = () => {
    let { place } = useParams()
    const [lat, setLat] = useState(0.0)
    const [lng, setLng] = useState(0.0)
    const [timezone, setTimezone] = useState(0.0)
    const [weather, setWeather] = useState([])
    const [selectedDay, setselectedDay] = useState(0)
    const weatherCodes = {
        0: 'sereno',
        1: 'prevalentemente sereno',
        2: 'nuvoloso',
        3: 'coperto',
        45: 'nebbia',
        48: 'nebbia gelata',
        51: 'pioviggine leggera',
        53: 'pioviggine',
        55: 'pioviggine',
        56: 'pioviggine gelata',
        57: 'pioviggine gelata',
        61: 'pioggia leggera',
        63: 'pioggia',
        65: 'pioggia intensa',
        66: 'pioggia gelata',
        67: 'pioggia gelata',
        71: 'nevicata leggera',
        73: 'nevicata',
        75: 'nevicata intensa',
        77: 'nevicata granulosa',
        80: 'rovesci leggeri',
        81: 'rovesci',
        82: 'rovesci violenti',
        85: 'rovesci di neve',
        86: 'rovesci di neve',
        95: 'temporale',
        96: 'temporale con grandine',
        99: 'temporale con grandine',
    }

    useEffect(() => {
        async function fetchWeather() {
            const requestLatLng = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}&language=it`).then(res => res.json())
            setLat(parseFloat(requestLatLng.results[0].latitude))
            setLng(parseFloat(requestLatLng.results[0].longitude))
            setTimezone(requestLatLng.results[0].timezone)
            if (lat && lng && timezone) {
                const requestWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${timezone}`).then(res => res.json())
                const weatherAPI = requestWeather.daily

                let myWeather = []
                for (let i = 0; i < 6; i++) {
                    myWeather[i] = {
                        date: weatherAPI.time[i].split('-')[2] + '/' + weatherAPI.time[i].split('-')[1], // converts YYYY-MM-DD (API format) to DD/MM format
                        weather: weatherCodes[weatherAPI.weathercode[i]], // makes weather code human-readable
                        maxT: weatherAPI.temperature_2m_max[i],
                        minT: weatherAPI.temperature_2m_min[i],
                    }
                }

                setWeather(myWeather)
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
            <div className="selectedDay">
                <SelectedDay
                    date={weather[selectedDay]?.date}
                    weather={weather[selectedDay]?.weather}
                    maxT={weather[selectedDay]?.maxT}
                    minT={weather[selectedDay]?.minT}
                />
            </div>
            <div className="days">
                {
                    weather.map((w, i) => {
                        return <button key={i} className="dayBtn" onClick={e => clickDayBtn(e, i)}>
                            <Day key={i}
                                 date={weather[i].date}
                                 weather={weather[i].weather}
                                 maxT={weather[i].maxT}
                                 minT={weather[i].minT}
                            />
                        </button>
                    })
                }
            </div>
        </div>
    )
}