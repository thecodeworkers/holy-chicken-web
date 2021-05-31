import React from 'react'
import { useSelector } from 'react-redux'
import { AboutUs } from '@components'
import { wrapper } from '@store'
import { getResources } from '@store/actions'

const AboutUsPage = () => {
  const { page: { aboutPage: { aboutUs } }, resource: { general: { general } } } = useSelector((state: any) => state)

  return <AboutUs content={aboutUs} data={general} />
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources('aboutPage'))
)

export default AboutUsPage
