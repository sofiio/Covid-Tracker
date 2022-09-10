import { List, ListItem, ListItemAvatar, ListItemText, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '../Utils/api'
import { numberPrettierTwo, sortData } from '../Utils/utils'
import './CountryTable.css'

const CountryTable = () => {
    const [tableData, setTableData] = useState([])
    const [currentCases, setCurrentCases] = useState('cases')
    const [countries, setCountries] = useState({})

    useEffect(() => {
        const getCountriesData = async () => {
          try {
            const data = await api.getData('countries')
            setTableData(data)
            let sortedData = sortData(data, currentCases)
            setTableData(sortedData)
            const countries = data.map(country => (
              {
                name: country.country,
                value: country.countryInfo.iso2,
                id: country.countryInfo._id
              }
            ))
            setCountries(countries)
          } catch (error) {
    
          }
        }
        getCountriesData()
      }, [currentCases])

    const handleChange = async (event) => {
        const value = event.target.value
        setCurrentCases(value)
        try {
            let sortedData = sortData(countries, currentCases)
            setTableData(sortedData)
        } catch (error) {
        }

    }

    return (
        <div className='countryTable'>
            <div className='countryTable__switch'>
                <ToggleButtonGroup size='medium' value={currentCases} exclusive onChange={handleChange}>
                    <ToggleButton value="cases" >Cases</ToggleButton>
                    <ToggleButton value="recovered" >Recovered</ToggleButton>
                    <ToggleButton value="lethal" >Lethal</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <main>
                {tableData.map(country => (
                    <List key={country.country} >
                        <ListItem>
                            <ListItemAvatar>
                                {/* <img className='countryTable__flag' src={country.countryInfo.flag} /> */}
                            </ListItemAvatar>
                            <ListItemText primary={country.country} secondary={currentCases === 'cases'
                                ? <strong className='countryTable--cases'>{country.todayCases}</strong>
                                : currentCases === 'recovered' ? <strong className='countryTable--recovered'>{numberPrettierTwo(country.todayRecovered)}</strong>
                                    : <strong className='countryTable--lethal'>{numberPrettierTwo(country.critical)}</strong>
                            }
                            />
                        </ListItem>
                    </List>
                ))}
            </main>
        </div >
    )
}
export default React.memo(CountryTable)