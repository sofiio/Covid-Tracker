import { ReactComponent as SearchIcon } from '../../Assets/search.svg'
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { api } from '../Utils/api'
import './Search.css'


const Search = ({ countries, setCountryInfo, setMapZoom, setMapCenter, setCountryName }) => {
    const [search, setSearch] = useState('')

    const countryName = countries.map(country=>(
        //Country name to LowerCase
        country.name.toLowerCase()
    ))

    // if search value is correct country name
    const isResult = countryName.includes(search.toLowerCase())

    const handleSearch = async (e) => {
        try {
            e.preventDefault()
            setSearch('')
            const data = await api.getData(`countries/${search}`)
            setCountryInfo(data)
            // if country is worldwide use default lat and long
            data?.country
                ? setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long })
                : setMapCenter({ lat: 34.80746, lng: -40.4796 })

            const num = 1000
            // zoom depends on country population
            const zoomCountry = data.population < 10 * (num * num) ? 6 : 3
            setMapZoom(zoomCountry)
        } catch (error) {
        }
        setCountryName(search)
    }

    return (
        <form className='search'>
            <TextField size='small'  onSubmit={handleSearch} className='search__field'
                value={search} onChange={e => setSearch(e.target.value)}
                id="search"
                placeholder='Country'
            />
            <Button className='search__button' disabled={!isResult} variant="secondary" onClick={handleSearch} type='submit'>
                <SearchIcon />
            </Button>
        </form>
    )
}

export default React.memo(Search)