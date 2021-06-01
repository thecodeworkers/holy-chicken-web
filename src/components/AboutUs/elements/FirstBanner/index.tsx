import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard, Button, Stepper } from '@components'
import { useRouter } from 'next/router'

const FirstBanner = ({ data }) => {

  const router = useRouter()
  const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

  return (

    <div className={styles._content}>
      <div style={{display:'flex'}}>



         </div>
    </div>
  )
}

export default FirstBanner
