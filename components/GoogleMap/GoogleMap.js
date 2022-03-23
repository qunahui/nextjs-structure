import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

const MapWithAMarker = withScriptjs(
  withGoogleMap(({ location }) => {
    return (
      <GoogleMap defaultZoom={17} center={location}>
        <Marker position={location} />
      </GoogleMap>
    )
  }),
)

function CustomGoogleMap(props) {
  return (
    <MapWithAMarker
      googleMapURL=""
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={
        <div style={{ height: `250px`, marginBottom: props.location ? '.5rem' : 0 }} />
      }
      mapElement={<div style={{ height: `100%` }} />}
      location={props.location}
    />
  )
}

export default CustomGoogleMap
