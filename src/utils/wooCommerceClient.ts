import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'
import { fallbackRestUrl, fallbackWooCommerceApiClient, fallbackWooCommerceApiSecret } from './path'

const WooCommerceClient = async (url: string, method: string = 'GET', data: any | null = null) => {

  const wooCommerce = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WP_ROOT_API_URL || fallbackRestUrl,
    consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY || fallbackWooCommerceApiClient,
    consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET || fallbackWooCommerceApiSecret,
    version: 'wc/v3',
  })

  switch (method) {
    case 'GET':
      const get = await wooCommerce.get(url)
      return get.data
    case 'POST':
      const post = await wooCommerce.post(url, data)
      return post.data
    case 'PUT':
      const put = await wooCommerce.put(url, data)
      return put.data
    case 'DELETE':
      const del = await wooCommerce.get(url)
      return del.data
    default:
      return {}
  }

}

export default WooCommerceClient
