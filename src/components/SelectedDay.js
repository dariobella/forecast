import './SelectedDay.css'

export const SelectedDay = (props) => {

    return (
        <div className="selectedDay">
            <table>
                <thead>
                    <tr>
                        <th>Ora</th>
                        <th>Meteo</th>
                        <th>T (°C)</th>
                        <th>Precipitazioni (mm)</th>
                        <th>Vento (km/h)</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.weather?.map((w, i) => {
                        if (i % 2 === 0) {
                            return  <tr key={i} className={i}>
                                <td> { w.time } </td>
                                <td> { w.weather } </td>
                                <td> { w.T }° </td>
                                <td> { w.precipitation } </td>
                                <td> { w.wind } </td>
                            </tr>
                        }
                    })
                }
                </tbody>
            </table>
        </div>
    )
}