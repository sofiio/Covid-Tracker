import React, { useEffect, useState } from 'react'

import { Card, CardContent, List, ListItem, ListItemIcon, Typography } from '@mui/material'
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import PublicIcon from '@mui/icons-material/Public'

import { api } from '../Utils/api'
import './CountryInfo.css'
import { numberPrettierTwo } from '../Utils/utils';


const CountryInfo = ({ countryName = 'worldwide' }) => {  
    const [countryData, setCountryData] = useState({})
    const [isCountry, setIsCountry] = useState(false)
    
    useEffect(() => {
        const getCountryData = async () => {
            try {
                const data = countryName === 'worldwide'
                    ? await api.getData('all')
                    : await api.getData(`countries/${countryName}`)
                setCountryData(data)
                const country = data.hasOwnProperty('countryInfo')
                setIsCountry(country)
            } catch (error) {
            } finally {
            }
        }
        getCountryData()
    }, [countryName])
    const pieChartData = [
        { name: "Cases", value: countryData.cases },
        { name: "Recovered", value: countryData.recovered },
        { name: "Lethal", value: countryData.deaths },
        { name: "Active", value: countryData.active },
        { name: "Tests", value: countryData.testsPerOneMillion },
        { name: "Critical", value: countryData.critical },
    ]

    const cases = 'rgb(50 115 255)'
    const recovered = 'rgb(57 255 114)'
    const lethal = 'rgb(255 128 73)'
    const active = 'rgb(56 255 251)'
    const tests = 'rgb(130 42 149)'
    const critical = 'rgb(255 56 87)'

    const COLORS = [cases, recovered, lethal, active, tests, critical]

    const randomKey = (num) => {
        return Math.random(num)
    }

    return (
        <>
            <h3>Country Info</h3>
            <Card className='countryInfo'>
                <CardContent>
                    <div className='countryInfo_pieChart'>
                        <ResponsiveContainer>
                            <PieChart key={randomKey(10)}>
                                <Pie
                                    data={pieChartData}
                                    innerRadius={80}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    stroke='false'
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className='countryInfo__flag'>
                            {countryName !== 'worldwide' &&
                                <div className='countryInfo__flagItem'>
                                    {isCountry && <img src={countryData.countryInfo.flag} alt={countryData.country} />}
                                </div>
                            }
                        </div>

                    </div>
                    <Typography variant="h4" >
                        {countryData.country ? countryData.country : 'Worldwide'}
                    </Typography>
                    <div className='countryInfo__stats'>
                        <CountryInfoList title='Cases'
                            number={countryData.cases} icon={<PublicIcon />} color='cases'
                        />
                        <CountryInfoList title='Recovered'
                            number={countryData.recovered} icon={<PublicIcon />} color='recovered'
                        />
                        <CountryInfoList title='Lethal'
                            number={countryData.deaths} icon={<PublicIcon />} color='lethal'
                        />
                        <CountryInfoList title='Active'
                            number={countryData.active} icon={<PublicIcon />} color='active'
                        />
                        <CountryInfoList title='Tests'
                            number={countryData.testsPerOneMillion} icon={<PublicIcon />} color='tests'
                        />
                        <CountryInfoList title='Critical'
                            number={countryData.critical} icon={<PublicIcon />} color='critical'
                        />
                    </div>

                </CardContent>
            </Card>
        </>
    )
}

export default React.memo(CountryInfo)

export const CountryInfoList = ({ title, number, icon, color }) => {
    return (
        <List className='countryInfoList'>
            <ListItem disablePadding>
                <ListItemIcon>
                    <div className={`countryInfoList__icon ${color}`}></div>
                </ListItemIcon>
                <div className='countryInfoList__item'>
                    <span className='countryInfoList__title'>{title}</span>
                    <span className='countryInfoList__number'>{numberPrettierTwo(number)}</span>
                </div>
            </ListItem>
        </List >
    )
}
