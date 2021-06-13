import React from 'react'
import { useSelector } from 'react-redux'
import { Shop } from '@components'
import { wrapper } from '@store'
import { getResources } from '@store/actions'

const ShopPage = () => {
  const { resource: { general: { general } } } = useSelector((state: any) => state)
   return <Shop content={'aboutUs'} data={general} />

}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources('aboutPage'))

)

export default ShopPage
