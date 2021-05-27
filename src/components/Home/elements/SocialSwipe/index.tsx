import { useState } from 'react';
import styles from './styles.module.scss'
import { Insta, WhatsApp, Twitter } from '@images/icons'

const SocialSwipe = () => {

  const [animate, setAnimate]=useState(false)

  const animation = () => {
    if (!animate) setAnimate(true)
    if (animate) setAnimate(false)
  }

  return(
    <div className={!animate ? styles._main : styles._mainAnimate} onClick={animation}>
      <div className={styles._triangleMain}>
      <div className={styles._triangle}>

      </div>
      </div>
      <div className={styles._content}>
      <div className={styles._logo}>
      <Insta color={'#fff'} />
      </div>
      <div className={styles._logo}>
      <Twitter color={'#fff'} />
      </div>

      <div className={styles._logo}>
      <WhatsApp color={'#fff'} />
      </div>
      </div>

      <div className={styles._whiteContent}>
      <div className={styles._whiteCard}>
        <div className={styles._textContainer}>
        <p className={styles._text}>@holychicken.ccs</p>
        <p className={styles._text}>4.606</p>
        </div>
        <img src={'images/resources/burguer.png'} width={200}></img>
      </div>
      <div className={styles._whiteCard}>
        <div className={styles._textContainer}>
        <p className={styles._text}>@holychicken.ccs</p>
        <p className={styles._text}>4.206</p>
        </div>
        <img src={'images/resources/burguer.png'} width={200}></img>
      </div>
      <div className={styles._whiteCard}>
        <div className={styles._textContainer}>
        <p className={styles._text}>@holychicken.ccs</p>
        <p className={styles._text}>46</p>
        </div>
        <img src={'images/resources/burguer.png'} width={200}></img>
      </div>
      </div>


    </div>
  )
}

export default SocialSwipe
