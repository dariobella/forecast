
export const Day = (props) => {

    return (
        <div className="day">
            <h2>{props.date}</h2>
            <h3>Weathercode {props.weathercode}</h3>
            <h3>Max T {props.maxT}</h3>
            <h3>Min T {props.minT}</h3>
        </div>
    )
}