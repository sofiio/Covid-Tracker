import React, { useEffect, useState } from 'react';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import { api } from '../Utils/api';
import './Graph.css';
import { chartDataFormatter } from '../Utils/utils';


const tooltipStyle = {
    color: '#267322',
    backgroundColor: 'rgb(31 33 40)',
    border: 'none',
    borderRadius: '20px',
    padding: '1rem'
}

const Graph = ({ countryName }) => {
    const [chartData, setChartData] = useState({})
    const [currentCases, setCurrentCases] = useState('cases')
    const [color, setColor] = useState('rgb(50 115 255)')
    const handleCasesChange = (event) => {
        const cases = event.target.value
        setCurrentCases(cases)
        cases === 'cases' ? setColor('rgb(50 115 255)') : setColor('rgb(255 128 73)')
    }

    useEffect(() => {
        const getData = async () => {
            try {
                let data = countryName === 'worldwide'
                    ? await api.getData('historical/all?lastdays=14')
                    : await api.getData(`historical/${countryName}?lastdays=14`)

                let chartMonthDay = countryName === 'worldwide'
                    ? chartDataFormatter(data, currentCases)
                    : chartDataFormatter(data.timeline, currentCases)
                setChartData(chartMonthDay)
            } catch (error) {
            } finally { }
        }
        getData()
    }, [countryName, currentCases])

    return (
        <div className='graph'>
            <h3>Last 14 Days</h3>
            <div className='graph__switch'>
                <ToggleButtonGroup size='medium' value={currentCases} exclusive onChange={handleCasesChange}>
                    <ToggleButton value="cases">Cases</ToggleButton>
                    <ToggleButton value="lethal">Lethal</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width="100%" height="100%" data={chartData}
                    margin={{ top: 20, right: 0, left: 0, bottom: 20, }}>
                    <XAxis className='graph_x' axisLine={false} tickLine={false} dataKey='date' tick={{ fill: 'white' }} tickMargin={10} />
                    <Tooltip  contentStyle={tooltipStyle} cursor={{ fill: 'transparent', active: false }} offset={10} />
                    <Bar dataKey='casesValue' name={currentCases} fill={color} animationDuration={2000} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default React.memo(Graph)