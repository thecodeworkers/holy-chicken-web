import { GraphQlClient } from '@utils'

const getTmpSessionToken = async () => {
  const query = `
    query TmpSessionQuery {
      customer {
        sessionToken
      }
    }
  `
  const result = await GraphQlClient(query, {}, null)
  return result
}

export default getTmpSessionToken
