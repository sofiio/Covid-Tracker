import React, { useEffect, useState } from 'react'

import { MapContainer, Popup, useMap, GeoJSON, useMapEvent, ZoomControl } from 'react-leaflet'
import { numberPrettierTwo, showCirclesOnMap } from '../Utils/utils'
import './leaflet.css'
import './Map.css'
import './countries.geo.json'

// Change Map Location
const ChangeView = ({ center, zoom }) => {
    const map = useMap()
    map.flyTo(center, zoom, {
        animate: true,
    })
    return null
}
// Set View With Animation on Clik
const SetViewOnClick = () => {
    const map = useMapEvent('click', (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: true,
            duration: 1
        })
    })
    return null
}

const Map = ({ center, zoom, countries, casesType, popupCountry, circleColor }) => {
    const [jsonData, setJsonData] = useState([])
    const keyFunc = (num) => Math.random(num)
    useEffect(() => {
        const fetchMap = async () => {
            try {
                const response = await fetch('./countries.geo.json')
                const data = await response.json()
                setJsonData(data)
            } catch (error) {

            }
        }
        fetchMap()
    }, [])


    const mapStyle = () => {
        return {
            fillColor: 'rgb(50 115 255)',
            weight: 2,
            opacity: 1,
            color: 'rgb(50 115 255)',  //Outline color
            fillOpacity: 0.1,
        }
    }
    return (
        <div className='map'>
            <h3>Map</h3>
            <MapContainer className="map__container" zoomControl={false} scrollWheelZoom={false} center={center} zoom={zoom}>
                <ChangeView center={center} zoom={zoom} color={circleColor} position='topright' />
                <GeoJSON data={jsonData} key={keyFunc(10)} style={mapStyle} />
                <SetViewOnClick />
                <ZoomControl position='topright' />
                {showCirclesOnMap(countries, casesType, circleColor)}
                {popupCountry?.countryInfo &&
                    <Popup position={center} className='popup' closeButton={false}>
                        <div className='popup__header'>
                            <div className='popup__flag'><img src={popupCountry.countryInfo.flag} alt={popupCountry.countryInfo.iso2} /></div>
                            <div>{popupCountry.country}</div>
                        </div>
                        <div className='popup__items'>
                            <div className='popup__item'><div className='popup__cases'></div>{numberPrettierTwo(popupCountry.cases)}</div>
                            <div className='popup__item'><div className='popup__recovered'></div>{numberPrettierTwo(popupCountry.recovered)}</div>
                            <div className='popup__item'><div className='popup__lethal'></div>{numberPrettierTwo(popupCountry.critical)}</div>
                        </div>
                    </Popup>
                }
            </MapContainer>
        </div>
    )
}

export default Map

