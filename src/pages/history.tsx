import React from 'react'
import { useSelector } from 'react-redux'
import { Shop } from '@components'
import { wrapper } from '@store'
import { getResources } from '@store/actions'
import { History } from '@components'

const HistoryPage = () => {
  const { resource: { general: { general } } } = useSelector((state: any) => state)

  return (
    <History data={general} />
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources())
)

export default HistoryPage
