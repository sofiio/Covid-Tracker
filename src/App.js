import React, { useEffect, useState } from 'react'

import logoImage from './Assets/logo.png'
import { Card } from '@mui/material'
// import CountryTable from './components/CountryTable/CountryTable'
import InfoBox from './components/InfoBox/InfoBox'
import Map from './components/Map/Map'
import Search from './components/Search/Search'
import SelectContry from './components/SelectCountry/SelectContry'

import { ThemeProvider } from '@mui/material'
import customTheme from './theme/theme'

import './App.css'
import { api } from './components/Utils/api'
import CountryInfo from './components/CountryInfo/CountryInfo'
import Graph from './components/Graph/Graph'

const App = () => {
  const [countryInfo, setCountryInfo] = useState({})
  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapCountries, setMapCountries] = useState([])
  const [mapZoom, setMapZoom] = useState(3)
  const [circleColor, setCircleColor] = useState('rgb(50 115 255)')
  const [casesType, setCasesType] = useState('cases')
  const [currentDay, setCurrentDay] = useState('Today')
  // const [tableData, setTableData] = useState([])

  useEffect(() => {
    const getWorldwideData = async () => {
      try {
        const data = await api.getData('all')
        setCountryInfo(data)
        setCountryName('worldwide')
      } catch (error) {
        console.log(error)
      }
    }
    getWorldwideData()

  }, [])
  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const data = await api.getData('countries')
        setMapCountries(data)
        // setTableData(data)

        const countriesData = data.map(country => (
          {
            name: country.country,
            id: country.countryInfo._id,
            flag: country.countryInfo.flag,
            iso:country.countryInfo.iso
          }
        ))
        setCountries(countriesData)
      } catch (error) {

      }
    }
    getCountriesData()
  }, [])

  const currentDayHandler = async (day) => {
    try {
      const data = day === 'today'
        ? await api.getData('countries')
        :
        await api.getData('countries?twoDaysAgo=twoDaysAgo')
      setCurrentDay('yesterday')
      setMapCountries(data)
      // setTableData(data)
    } catch (error) {

    }
  }
  const caseTypeHandler = (value) => {
    switch (value) {
      case 'recovered':
        return (
          setCasesType('recovered'),
          setCircleColor('rgb(41 219 92)')
        )

      case 'lethal':
        return (
          setCasesType('lethal'),
          setCircleColor('rgb(255 128 73)')
        )

      default:
        return (
          setCasesType('cases'),
          setCircleColor('rgb(50 115 255)')
        )
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
      <div className='app'>
        <div className="app_header">
          <div className='app_logo'>
            <img src={logoImage} alt='logo'/>
          </div>
          <Search countries={countries} setCountryInfo={setCountryInfo} setMapZoom={setMapZoom} setMapCenter={setMapCenter} setCountryName={setCountryName} />
          <SelectContry setCountryInfo={setCountryInfo} setMapZoom={setMapZoom} setCountryName={setCountryName}
            setMapCenter={setMapCenter} countries={countries} />
        </div>
        <div className='app_content'>
          <div className='app_left'>
            <div className="app_stats">
              <InfoBox countryName={countryInfo.country} caseTypeHandler={caseTypeHandler} casesType={casesType} currentDayHandler={currentDayHandler} />
            </div>
            <Card className='mapContainer'>
              {countryInfo?.updated &&
                <Map zoom={mapZoom} center={mapCenter} countries={mapCountries}
                  casesType={casesType} popupCountry={countryInfo} circleColor={circleColor} currentDay={currentDay} />
              }
            </Card>
            <Graph countryName={countryName} />
          </div>
          <div className='app_right'>
            <CountryInfo countryName={countryInfo.country} />
            {/* <CountryTable countries={tableData} casesType={casesType} /> */}
          </div>

        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
