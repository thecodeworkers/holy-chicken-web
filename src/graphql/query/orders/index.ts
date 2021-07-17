import { GraphQlClient } from '@utils'

const getOrdersQuery = async (sessionToken) => {
  const query = `
    query TmpSessionQuery {
      orders {
        nodes {
          orderNumber
          date
          databaseId
          status
          dateCompleted
          total
          subtotal
          trackOrder {
            step
          }
          lineItems {
            nodes {
              product {
                name
                id
                image {
                  mediaItemUrl
                }
                description
              }
            }
          }
          billing {
            email
            firstName
            lastName
          }
        }
      }
    }
  `
  const result = await GraphQlClient(query, {}, null, sessionToken)
  return result
}

export default getOrdersQuery
