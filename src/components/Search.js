import {useState, useEffect} from "react";
import './Search.css'
import {useNavigate} from "react-router-dom";

export const Search = (props) => {
    const [place, setPlace] = useState(props.place || '')
    const [autocomplete, setAutocomplete] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchAutocomplete() {
            const requestAutocomplete = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}&language=it`).then(res => res.json())
            console.log(requestAutocomplete)
            setAutocomplete(requestAutocomplete.results)
        }
        fetchAutocomplete()
    }, [place])

    function FormSubmit(e) {
        e.preventDefault()
        navigate(`/place/${place}`)
    }

    return (
        <div className={props.className || 'large'}>
            <form id="searchForm" onSubmit={FormSubmit}>
                <input
                    id="search"
                    type="text"
                    placeholder="Cerca un luogo"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                />
                <button type="submit" className="searchBtn">
                    <span className="material-icons-round searchIcon">
                        search
                    </span>
                </button>
            </form>
            <div className="autocomplete">
                {
                    autocomplete?.map((r) => {
                        return <button onClick={e => setPlace(r.name)} key={r.id}> {r.name} </button>
                    })
                }
            </div>
        </div>
    )
}