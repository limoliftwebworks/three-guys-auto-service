const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY

export const searchPlaces = async (query: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${GOOGLE_PLACES_API_KEY}`
    )
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Error searching places:', error)
    return []
  }
}

export const getPlaceDetails = async (placeId: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`
    )
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error getting place details:', error)
    return null
  }
} 