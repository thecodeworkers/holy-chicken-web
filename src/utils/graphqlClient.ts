import axios from 'axios'
import { backupURL } from '@utils/path'

const WP_API_URL = process.env.WP_API_URL ?? backupURL

const GraphQlClient = async (query, variables = {}) => {

  try {
    const headers = { 'Content-Type': 'application/json' }
    const response = await axios.post(WP_API_URL, { query, variables }, { headers })

    return response.data.data

  } catch (err) {
    return null
  }
}

export default GraphQlClient
