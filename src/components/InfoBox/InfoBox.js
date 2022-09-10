import React, { useEffect, useState } from 'react'

import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import { Card, CardContent, ToggleButtonGroup, ToggleButton } from '@mui/material'

import { api } from '../Utils/api'
import { numberPrettier } from '../Utils/utils'
import './InfoBox.css'
import Chart from './Chart/Chart'


const InfoBox = ({ countryName = 'worldwide', caseTypeHandler, casesType, currentDayHandler }) => {

    const [countryInfo, setCountryInfo] = useState({})
    const [currentDay, setCurrentDay] = useState('Today')
    const [yesterday, setYesterday] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    const difference = countryInfo.todayCases - yesterday

    useEffect(() => {
        const todayHandler = async () => {
            try {
                setIsLoaded(false)
                const data = countryName === 'worldwide'
                    ? await api.getData('all')
                    : await api.getData(`countries/${countryName}`)
                setCountryInfo(data)
                const dataLastDays = countryName === 'worldwide'
                    ? await api.getData('historical/all?lastdays=2')
                    : await api.getData(`historical/${countryName}?lastdays=2`)
                const yesterday = countryName === 'worldwide'
                    ? buildDifferenceCases(dataLastDays)
                    : buildDifferenceCases(dataLastDays.timeline)
                setYesterday(yesterday)
                setIsLoaded(true)

            } catch (error) {

            }
        }
        todayHandler()
    }, [countryName])

    const buildDifferenceCases = (data) => {
        const sortData = []
        for (let value in data.cases) {
            sortData.push(data['cases'][value])
        }
        const yesterday = sortData.reduce((p, c) => p - c)
        return Math.abs(yesterday)
    }

    const handleChange = async (event) => {
        const day = event.target.value
        setCurrentDay(day)
        currentDayHandler(day)
        try {
            const data = countryName === 'worldwide'
                ? await api.getData(`${day === 'Today' ? 'all' : 'all?twoDaysAgo=twoDaysAgo'}`)
                : await api.getData(`countries/${countryName}${day === 'Today' ? '' : '?twoDaysAgo=twoDaysAgo'}`)
            setCountryInfo(data)
        } catch (error) {
        }
    }


    return (
        <>
            <div className='infoBox__switch'>
                <ToggleButtonGroup size='medium' value={currentDay} exclusive onChange={handleChange}>
                    <ToggleButton value="Today">Today</ToggleButton>
                    <ToggleButton value="Yesterday">Yesterday</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className='infoBox__blocks'>
                <div className='infoBox' onClick={e => caseTypeHandler('cases')}>
                    <InfoBoxList title='Cases' active={casesType === 'cases'}
                        chart={true}
                        countryName={countryName}
                        infoBoxChart={<Chart countryName={countryName} casesType={'cases'} />}
                        isLoaded={isLoaded}
                        difference={difference}
                        color={'cases'} border={'cases__border'}
                        casesData={countryInfo.todayCases} total={countryInfo.cases}
                        icon={<AutoAwesomeMotionIcon />} currentDay={currentDay} />
                </div>
                <div className='infoBox' onClick={e => caseTypeHandler('lethal')}>
                    <InfoBoxList title='Lethal' active={casesType === 'lethal'}
                        chart={true}
                        infoBoxChart={<Chart countryName={countryName} casesType={'deaths'} />}
                        color={'lethal'} border={'lethal__border'}
                        casesData={Math.ceil(countryInfo.todayDeaths)}
                        total={countryInfo.deaths} icon={<ElectricalServicesIcon />} currentDay={currentDay} />
                </div>
                <div className='infoBox' onClick={e => caseTypeHandler('recovered')}>
                    <InfoBoxList title='Recovered' active={casesType === 'recovered'} color={'recovered'} border={'recovered__border'}
                        casesData={countryInfo.todayRecovered ?? null} total={countryInfo.recovered} icon={<BatchPredictionIcon />} currentDay={currentDay} />
                </div>
            </div>
        </>
    )
}

export const InfoBoxList = ({ title, casesData, total, color, active, icon, border, difference, isLoaded, infoBoxChart, chart }) => {
    return (
        <Card className='infoBoxList'>
            <CardContent className={active ? `infoBoxList--selected ${border}` : 'infoBoxList--notSelected'}>
                <div className='infoBoxList__header'>
                    <div className='infoBoxList__title'>
                        <div className={`infoBoxList__icon ${color}`}>{icon}</div> {title}
                    </div>
                    {title === 'Cases' && difference && <span className={difference > 0 ? 'infoBoxList__red' : 'infoBoxList__green'}>
                        {isLoaded && numberPrettier(difference)}
                    </span>}
                </div>
                <div className='infoBoxList__chart'>
                    {infoBoxChart}
                    <div className='infoBoxList__cases'>
                        <div className='infoBoxList__numbers'>
                            {numberPrettier(casesData)}
                        </div>
                    </div>
                </div>
                <div className='infoBoxList__total'>
                    Total {numberPrettier(total)}
                </div>
            </CardContent>
        </Card >
    )
}
export default React.memo(InfoBox)
