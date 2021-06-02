import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard, Button, Stepper } from '@components'
import { useRouter } from 'next/router'
import { Timeline } from 'antd';

const SecondBanner = ({ data }) => {
console.log(data);

  const router = useRouter()

  return (

    <div className={styles._content}>


    </div>
  )
}

export default SecondBanner
