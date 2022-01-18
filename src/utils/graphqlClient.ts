import axios from 'axios'
import { backupURL } from '@utils/path'

const WP_API_URL = process.env.WP_API_URL ?? backupURL

const GraphQlClient = async (query, variables = {}, auth = null, wcAuth = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': (auth) ? `Bearer ${auth}` : '',
      'woocommerce-session': wcAuth ? `Session ${wcAuth}` : ''
    }
    const response = await axios.post(WP_API_URL, { query, variables }, { headers })

    if (response.data.errors?.length) return response.data.errors[0]
    if (response.headers['woocommerce-session']) response.data.data['sessionToken'] = response.headers['woocommerce-session']
    return response.data.data

  } catch (err) {
    console.log(err)
    return null
  }
}


export default GraphQlClient
