import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { setStep } from '@store/actions'
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap
} from 'react-google-maps'

function Maps(props) {
  const [coord, setCoord] = useState({
    lat:0,
    lng:0
  })
  const dispatch = useDispatch()

  const getLocation=()=>{
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        setCoord({
          lat:position.coords.latitude,
          lng:position.coords.longitude
        })
      },
      (error)=>{
        console.log(error)
      },
      {
        enableHighAccuracy:true
      }
    )
  }
  const sendLocation=()=>{
    dispatch(setStep({ delivery_data: {...props.delivery_data,locationMap:`http://maps.google.com/maps?z=18&q=${coord.lat},${coord.lng}`}, step: 3 }))
    console.log(props.delivery_data)
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{lat:10.4811611,lng:-66.8586809}}
      >
        {coord.lat!=0?<div><Marker position={coord} /><button onClick={()=>sendLocation()} className={styles._addAddress}>Siguiente</button></div>:<h3>para utilizar esta funcion necesita dar acceso a su localizacion </h3>}

      </GoogleMap>
  )
}
export default withScriptjs(
  withGoogleMap(
    Maps
  )
)
//  (<>..<>)


