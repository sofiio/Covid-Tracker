import React, { useState } from 'react'

import { Button, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { api } from '../Utils/api'

import './SelectCountry.css'


const SelectContry = ({ setCountryInfo, setMapZoom, setMapCenter, countries, setCountryName }) => {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const worldWide = <div className='modal__itemMain' key='worldwide' onClick={() => handleCountryChange('worldwide')}>Worldwide</div>
    const list = []
    countries.sort((a, b) => {
        if (a.name.charAt(0) !== b.name.charAt(0)) list.push({ title: a.name.charAt(0) })
        if (a.name === 'Albania') list.push({ title: 'A' })
        list.push({ name: a.name, id: a.id, flag: a.flag, iso: a.iso })
    })
    const countriesList = list.map((country, index) => (
        <span className='modal__item' key={index}>
            {country.name?.length > 1 ?
                <div className='modal__country'
                    onClick={() => handleCountryChange(country.name)} >
                    <div className='modal__title'>
                        <div className='modal__flag'><img src={country.flag} alt={country.name} /></div> {country.name}
                    </div>
                </div>
                : <Typography className='modal__letter' key={country.title + Math.random(2)}>{country.title}</Typography>
            }
        </span>

    ))

    const handleCountryChange = async (value) => {
        handleClose()
        const data = value === 'worldwide'
            ? await api.getData('countries')
            : await api.getData(`countries/${value}`)
        setCountryName(value === 'worldwide' ? 'worldwide' : value)
        setCountryInfo(data)
        // if country is worldwide use default lat and long
        data?.country
            ? setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long })
            : setMapCenter({ lat: 34.80746, lng: -40.4796 })

        const num = 1000
        // zoom depends on country population
        const zoomCountry = data.population < 10 * (num * num) ? 6 : 3
        setMapZoom(zoomCountry)
    }
    return (
        <div className='selectCountry'>
            <Button size='medium' variant='primary' onClick={handleOpen}>Select Country</Button>
            <Modal variant='countriesList' open={open} onClose={handleClose}>
                <Box className='modal'>
                    <main className='selectCountry__modal'>
                        {worldWide}
                        {countriesList}
                    </main>
                </Box>
            </Modal>
        </div>
    )
}

export default React.memo(SelectContry)