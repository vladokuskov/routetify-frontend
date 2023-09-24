import axios from 'axios'

const getPlace = async (value: string) => {
  try {
    axios.defaults.withCredentials = false
    const url = `https://geocode.maps.co/search?q=${value}`

    const response = await axios.get(url)

    if (response.status === 429 || response.status === 503) {
      throw new Error(
        'Too many requests are coming to the server, please try again in a few seconds.',
      )
    }

    const { data } = response

    return data
  } catch (err) {
    throw new Error('Something happened while we were looking for your place.')
  }
}

export { getPlace }
