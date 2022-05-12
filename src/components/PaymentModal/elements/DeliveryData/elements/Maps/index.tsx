import React, { useState } from 'react'
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap
} from 'react-google-maps'

function Maps() {
  const [name, setName] = useState('react')
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{lat:10.4811611,lng:-66.8586809}}
    />
  )
}
//10°28'52.2"N 66°51'27.4"W
//10.4811611,-66.8586809

export default withScriptjs(
  withGoogleMap(
    Maps
  )
)
