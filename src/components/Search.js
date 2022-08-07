import {useState, useEffect, useRef} from "react"
import {useNavigate} from "react-router-dom"

import './Search.css'

export const Search = (props) => {
    const [place, setPlace] = useState(props.place || '')
    const [autocomplete, setAutocomplete] = useState([])
    const [autocompleteClick, setAutocompleteClick] = useState(props.autocompleteClick || false)
    const navigate = useNavigate()
    const searchInput = useRef()

    useEffect(() => {
        const fetchAutocomplete = async () => {
            const requestAutocomplete = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}&language=it`).then(res => res.json())
            setAutocomplete(requestAutocomplete.results)
        }
        fetchAutocomplete()
    }, [place])

    function FormSubmit(e) {
        e.preventDefault()
        if (autocompleteClick) {
            navigate(`/place/${place}`)
        }
    }

    function autocompleteBtnClick(p) {
        setPlace(p)
        setAutocompleteClick(true)
        searchInput.current.focus()
    }

    function searchChange(v) {
        setPlace(v)
        setAutocompleteClick(false)
    }

    return (
        <div className={props.className || 'large'}>
            <div className="container">
                <form id="searchForm" autoComplete="off" onSubmit={FormSubmit}>
                    <input
                        ref={searchInput}
                        id="search"
                        type="text"
                        placeholder="Cerca un luogo"
                        value={place}
                        onChange={e => searchChange(e.target.value)}
                    />
                    <button type="submit" className="searchBtn">
                    <span className={`material-symbols-rounded ${autocompleteClick ? 'searchIcon' : 'searchIconDisabled'}`}>
                        search
                    </span>
                    </button>
                </form>
                <div className={`autocomplete ${autocompleteClick ? 'hideAutocomplete' : ''}`}>
                    {
                        autocomplete?.map((r) => {
                            return <button onClick={() => autocompleteBtnClick(r.name)} key={r.id}> {r.name} </button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}