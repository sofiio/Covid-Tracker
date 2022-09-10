import React, { useState, useEffect } from 'react'
import { Area, AreaChart, Tooltip, XAxis, ResponsiveContainer } from 'recharts'
import { api } from '../../Utils/api'
import { chartDataFormatter } from '../../Utils/utils'
import './Chart.css'

const Chart = ({ countryName, casesType }) => {
    const [chartData, setChartData] = useState({})

    const tooltipStyle = {
        color: '#267322',
        backgroundColor: 'rgb(31 33 40)',
        border: 'none',
        borderRadius: '20px',
        padding: '1rem'
    }

    const casesColor = casesType === 'cases'
    useEffect(() => {
        const getData = async () => {
            try {
                let data = countryName === 'worldwide'
                    ? await api.getData('historical/all?lastdays=14')
                    : await api.getData(`historical/${countryName}?lastdays=14`)

                let chartMonthDay = countryName === 'worldwide'
                    ? chartDataFormatter(data, casesType)
                    : chartDataFormatter(data.timeline, casesType)
                setChartData(chartMonthDay)
            } catch (error) {
            } finally { }
        }
        getData()
    }, [countryName])

    return (
        <div className='chart'>
            <ResponsiveContainer width='100%' height='100%'>
                <AreaChart width='100%' height='100%' data={chartData}
                    margin={{ top: 20, right: 0, left: 0, bottom: 20, }}>
                    <Tooltip allowEscapeViewBox={{ y: true }} contentStyle={tooltipStyle} cursor={false} offset={10} />
                    <XAxis axisLine={false} dataKey='date' tick={false} />
                    <Area type="monotone" name='cases' dataKey='casesValue'
                        stroke={casesColor ? 'rgb(50 115 255)' : 'rgb(255 128 73)'}
                        strokeWidth={2} fill={casesColor ? 'rgb(50 115 255 /40%)' : 'rgb(255 128 73 / 40%)'}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart