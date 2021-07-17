import React from 'react'
import { useSelector } from 'react-redux'
import { Shop } from '@components'
import { wrapper } from '@store'
import { getResources } from '@store/actions'

const ShopPage = () => {
  const {  page: { storePage: { store } },resource: { general: { general }, products, productsCategories, shop, } } = useSelector((state: any) => state)

  return <Shop content={products} storeData={store} backup={shop} data={general} filters={productsCategories} />

}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources('storePage'))

)

export default ShopPage
