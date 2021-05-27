import React from 'react'
import { useSelector } from 'react-redux'
import { wrapper } from '@store'
import { getResources } from '@store/actions'
import { Home } from '@components'
const HomePage = () => {
  const { page: { homePage: { home } }, resource: { general: {general}} } = useSelector((state: any) => state)

  return <Home content={home} data={general}/>
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources())
)

export default HomePage
