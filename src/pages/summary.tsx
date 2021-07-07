import React from 'react'
import { useSelector } from 'react-redux'
import { Shop } from '@components'
import { wrapper } from '@store'
import { getResources } from '@store/actions'
import { Summary } from '@components'

const SummaryPage = () => {
  const { resource: { general: { general } }, cart } = useSelector((state: any) => state)

  return (
    <Summary data={general} cartParam={cart?.cartProducts} />
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources())
)

export default SummaryPage
