import React from 'react'
import { useSelector } from 'react-redux'
// import { wrapper } from '@store'
// import { getPages } from '@store/actions'
import { Home } from '@components'

const HomePage = () => {
  // const { page: { homePage: { home } } } = useSelector((state: any) => state)
  return <Home />
}

// export const getStaticProps = wrapper.getStaticProps(
//   ({ store }) => store.dispatch(getPages('homePage'))
// )

export default HomePage
