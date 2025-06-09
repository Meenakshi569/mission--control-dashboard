import { MapPin } from "lucide-react"

const MapView = ({ location }) => {
  // Placeholder for map integration
  // You can integrate with Leaflet, Google Maps, or other mapping libraries here

  return (
    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
      <div className="text-center">
        <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">Map View</p>
        <p className="text-xs text-gray-500 mt-1">Location: {location}</p>
        <p className="text-xs text-gray-400 mt-2">Integrate with Leaflet or Google Maps for interactive map</p>
      </div>
    </div>
  )
}

export default MapView
