import { useState } from 'react';
import styles from './styles.module.scss'
import { Insta, WhatsApp, Twitter } from '@images/icons'

const SocialSwipe = () => {

  const [animate, setAnimate]=useState(false)
  const [show, setShow] = useState(0)

  const assignClass = () => {
    if(show === 0) return styles._main
    if(show === 1) return styles._mainIn
    if(show === 2) return styles._mainOut
  }

  const animation = () => {
    if (show === 0) setShow(2)
    if (show === 1) setShow(2)
    if (show === 2) setShow(1)
  }

  return(
    <div className={assignClass()} onClick={animation}>
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
      <a href={'https://www.instagram.com/holychicken.ccs/?hl=es-la'} target='_blank'>
        <div className={styles._textContainer}>
        <p className={styles._text}>@holychicken.ccs</p>
        <p className={styles._text}>4.606</p>
        </div>
        <img src={'images/resources/burguer.png'} width={170}></img>
      </a>
      </div>
      <div className={styles._whiteCard} >
      <a href={'https://www.instagram.com/holychicken.ccs/?hl=es-la'} target='_blank'>
        <div className={styles._textContainer}>
        <p className={styles._text}>@HolyChickenCcs</p>
        <p className={styles._text}>4.206</p>
        </div>
        <img src={'images/resources/burguer.png'} width={170}></img>
        </a>
      </div>
      </div>


    </div>
  )
}

export default SocialSwipe
