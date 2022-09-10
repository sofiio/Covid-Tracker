import { CircleMarker } from "react-leaflet"
import Numeral from "react-numeral"


export const sortData = (data, currentCases) => {
    const sortedData = [...data]
    return currentCases === 'cases' ? sortedData.sort((a, b) => a.todayCases > b.todayCases ? -1 : 1)
        : currentCases === 'recovered' ? sortedData.sort((a, b) => a.todayRecovered > b.todayRecovered ? -1 : 1)
            : sortedData.sort((a, b) => a.critical > b.critical ? -1 : 1)
}


// Format Numbers In Cool Style
export const numberPrettier = (number) => {
    return number !== 0 ? <Numeral value={number} format={"0.0a"} /> : number
}
// Format Numbers In Cool Style 2
export const numberPrettierTwo = (number) => {
    return number !== 0 ? <Numeral value={number} format={"+0,0"} /> : number
}

// Animated Number
// export const animatedNum = (number) => {
//     <AnimatedNumber component="text" value={number}
//         style={{fontSize: 48}}
//         frameStyle={perc => (
//             perc === 100 ? {} : { backgroundColor: '#ffeb3b' }
//         )}
//         duration={300}
//         formatValue={v=>v.toFixed(0)}
//          />
// }


// Draw circles on the map with Tooltip
let casesTypeColors = {
    cases: {
        multiplier: 20,
    },
    recovered: {
        multiplier: 20,
    },
    lethal: {
        multiplier: 8
    },
    deaths: {
        multiplier: 8
    }
}


// Draw circles on the map with Tooltip
export const showCirclesOnMap = (countries, casesType, circleColor) => (
    countries.map((country, index) => (
        <CircleMarker key={index}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{ weight: 1, color: circleColor, fillOpacity: 0.4 }}
            radius={
                casesType === 'cases' ? (Math.sqrt(country.todayCases) * 10 / casesTypeColors[casesType].multiplier)
                    : casesType === 'recovered' ? ((Math.sqrt(country.todayRecovered)) * 10 / casesTypeColors[casesType].multiplier)
                        : ((Math.sqrt(country.criticalPerOneMillion) * 10) / casesTypeColors[casesType].multiplier)
            }>
            {/* <Tooltip>Tooltip for CircleMarker</Tooltip> */}
        </CircleMarker>
    )
    )
)


// Sort Chart Data By Only Daily Cases from Total Daily Cases
export const chartDataFormatter = (data, casesType) => {
    const chartData = []
    for (let value in casesType === 'cases' ? data.cases : data.deaths) {
        const newData = {
            date: value,
            value: data[casesType === 'cases' ? 'cases' : 'deaths'][value],
        }
        chartData.push(newData)
    }

    const dailyCases = []

    for (let value in chartData) {
        const nextValue = (Number(value)+1)
        if (nextValue<chartData.length) {
            const newData = {
                date: chartData[value].date,
                value: Math.abs(chartData[nextValue].value - chartData[value].value),
            }
            dailyCases.push(newData)
        }
    }
    
    // chartData.sort((a, b) => {
    //     const newData = {
    //         value: Math.abs(b.value - a.value),
    //         date: a.date,
    //     }
    //     dailyCases.push(newData)
    // })

    const monthDay = []
    dailyCases?.map(e => {
        const extractDay = []
        if (e.date.length === 8) extractDay.push(e.date.substring(3, 5))
        if (e.date.length === 7) extractDay.push(e.date.substring(2, 4))
        if (e.date.length === 6) extractDay.push(e.date.substring(2, 3))

        const day = extractDay.toString()
        const month = e.date.length === 8 ? e.date.substring(0, 2) : e.date.substring(0, 1)
        const casesValue = e.value
        switch (month) {
            case '12':
                monthDay.push({
                    date: `Dec ${day}`,
                    casesValue: casesValue
                })
                break
            case '11':
                monthDay.push({
                    date: `Nov ${day}`,
                    casesValue: casesValue
                })
                break
            case '10':
                monthDay.push({
                    date: `Oct ${day}`,
                    casesValue: casesValue
                })
                break
            case '9':
                monthDay.push({
                    date: `Sep ${day}`,
                    casesValue: casesValue
                })
                break
            case '8':
                monthDay.push({
                    date: `Aug ${day}`,
                    casesValue: casesValue
                })
                break
            case '7':
                monthDay.push({
                    date: `Jul ${day}`,
                    casesValue: casesValue
                })
                break
            case '6':
                monthDay.push({
                    date: `Jun ${day}`,
                    casesValue: casesValue
                })
                break
            case '5':
                monthDay.push({
                    date: `May ${day}`,
                    casesValue: casesValue
                })
                break
            case '4':
                monthDay.push({
                    date: `Apr ${day}`,
                    casesValue: casesValue
                })
                break
            case '3':
                monthDay.push({
                    date: `Mar, ${day}`,
                    casesValue: casesValue
                })
                break
            case '2':
                monthDay.push({
                    date: `Feb, ${day}`,
                    casesValue: casesValue
                })
                break
            case '1':
                monthDay.push({
                    date: `Jan, ${day}`,
                    casesValue: casesValue
                })
                break

            default:
                monthDay.push('Not')
        }
        return extractDay
    })
    return monthDay
}