import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const Place = () => {
    let { place } = useParams()
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [weather, setWeather] = useState({})

    useEffect(() => {
        async function fetchPlace() {
            const request = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}&language=it`).then(res => res.json())
            setLat(request.results[0].latitude)
            setLng(request.results[0].longitude)
        }
        fetchPlace()

    }, [place])

    useEffect(() => {
        async function fetchWeather() {
            if (lat && lng) {
                console.log(lat)
                console.log(lng)
                const request = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin`).then(res => res.json())
                setWeather(request.daily)
            }
        }
        fetchWeather()

    }, [lat, lng])

    return (
        <div className="placePage">
            <h1>This is {place}'s place page, lat {lat}, lng {lng}</h1>
            {JSON.stringify(weather)}
        </div>
    )
}