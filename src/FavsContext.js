import { createContext, useState, useEffect } from "react"

const FavsContext = createContext([])

export function FavsProvider({ children }) {

    const [favs, setFavs] = useState([])
    const [firstLoad, setFirstLoad] = useState(false)

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('forecast_favs'));
        setFavs(favs);
        setFirstLoad(true)
    }, []);

    useEffect(() => {
        if (firstLoad) {
            localStorage.setItem('forecast_favs', JSON.stringify(favs));
        }
    }, [favs])

    const toggleFav = (fav) => {
        const i = favs.indexOf(fav)
        let f = [...favs]
        if (i > -1) {
            f.splice(i, 1);
            setFavs(f)
        } else {
            setFavs((prevState) => [...prevState, fav])
        }
    }

    return (
        <FavsContext.Provider value={{favs, toggleFav}}>
            { children }
        </FavsContext.Provider>
    )
}

export default FavsContext