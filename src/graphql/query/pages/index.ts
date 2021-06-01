import { GraphQlClient, normalized } from '@utils'
import homePageQuery from './homePage'
import aboutPageQuery from './aboutPage'

const pages = async (resource: any) => {

  const resources = {
    'homePage': homePageQuery,
    'aboutPage': aboutPageQuery
  }

  const query = `
    query Page {
      ${resources[resource]}
    }
  `

  const result: any = await GraphQlClient(query)
  return (result) ? 'nodes' in result[resource] ? normalized(result[resource].nodes) : normalized(result[resource]) : {}
}

export default pages
