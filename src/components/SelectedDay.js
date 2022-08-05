
export const SelectedDay = (props) => {

    return (
        <div className="today">
            <h2>Today is {props.date}, weather is {props.weathercode}, max temp is {props.maxT} and min is {props.minT} </h2>
        </div>
    )
}