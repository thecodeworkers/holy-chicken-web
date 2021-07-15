import axios from 'axios'
import { fallbackDolarClient } from '@utils/path'

const DOLAR_API_URL = process.env.DOLAR_TODAY_ENDPOINT ?? fallbackDolarClient

const DolarClient = async () => {
  try {
    const response = await axios.get(DOLAR_API_URL)
    return response.data
  } catch (err) {
    return null
  }
}

export default DolarClient


export const getDollarEquivalent = async (price: number) => {
  const dollar = await DolarClient()
  const dollarPrice = dollar?.USD?.promedio_real || 1
  return `Bs.${(price * dollarPrice).toLocaleString('ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
