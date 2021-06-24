import React from 'react'
import { useSelector } from 'react-redux'
import { Shop } from '@components'
import { wrapper } from '@store'
import { getResources } from '@store/actions'

const ShopPage = () => {
  const { resource: { general: { general }, products, productsCategories, shop, attributes } } = useSelector((state: any) => state)

  console.log(attributes);

  return <Shop content={products} backup={shop} data={general} filters={productsCategories} />

}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources())

)

export default ShopPage
