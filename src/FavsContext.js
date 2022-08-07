import { createContext, useState, useEffect } from "react"

const FavsContext = createContext([])

export function FavsProvider({ children }) {

    const [favs, setFavs] = useState([])

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('forecast_favs'));
        if (favs) {
            setFavs(favs);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('forecast_favs', JSON.stringify(favs));
    }, [favs]);

    const addFav = (fav) => {
        setFavs((prevState) => [...prevState, fav])
    }

    const deleteFav = (fav) => {
        const i = favs.indexOf(fav)
        if (i > -1) {
            favs.splice(i, 1);
        }
    }

    return (
        <FavsContext.Provider value={[favs, addFav, deleteFav]}>
            { children }
        </FavsContext.Provider>
    )
}

export default FavsContext