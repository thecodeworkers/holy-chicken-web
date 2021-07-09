import styles from './styles.module.scss'
import React from 'react'
import { ChickenLogo } from '@images/resources'
import { Insta, WhatsApp, Twitter } from '@images/icons'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setShowModal } from '@store/actions'

const Footer = ({ data, content }) => {

  const router = useRouter()
  const dispatch = useDispatch()

  const navigation = (route: string, reference = null, key = '') => {
    if (route == '/login') return dispatch(setShowModal({ loginModal: true }))
    if (route == '/contact') return dispatch(setShowModal({ contactModal: true }))
    if (router.pathname != route) {
      router.push(route)
    }
  }

  return content ? (
    <>
      <footer className={styles._footerContainer}>
        <div className={styles._footer}>

          <div className={styles._content}>
            <div className={styles._logoMain} onClick={() => navigation('/')} >
              <ChickenLogo color='#fff' />
            </div>
            <div className={styles._textContainer}>
              <p className={styles._title}>{data?.footerTitle}</p>
              <p className={styles._subtitle}>{data?.footerSubtitle}</p>
            </div>
            <div className={styles._links}>
              {
                data?.footerNavigation.map((item, index) => {
                  return (
                    <div key={index}>
                      <p onClick={() => navigation(item.link)} className={styles._link} >{item?.titulo}</p>
                    </div>
                  )
                }
                )
              }
            </div>

            <div className={styles._socialContainer}>
              <div className={styles._termsContainer}>
                <div className={styles._termsleft}>
                  <p className={styles._terms}>Política de privacidad  </p>
                </div>
                <div>
                  <p className={styles._politics}> Términos y condiciones</p>
                </div>
              </div>

              <div className={styles._socialMedia}>
                <div className={styles._icon}>
                  <a href={content[0]?.link} target='_blank'>
                    <Insta color={'#fff'} />
                  </a>
                </div>
                <div className={styles._icon}>
                  <a href={content[1]?.link} target='_blank'>
                    <Twitter color={'#fff'} />
                  </a>
                </div>
                <div className={styles._icon}>
                  <a href={content[2]?.link} target='_blank'>
                    <WhatsApp color={'#fff'} />
                  </a>
                </div>
              </div>

              <div className={styles._copyContainer}>
                <div className={styles._copyContent}>
                  <p className={styles._copy}>{data.copyright}</p>
                </div>
                <div className={styles._copy}>
                  <a href='https://www.thecodeworkers.com' >
                    <img src='images/icons/tcw-logo.svg' className={styles._makers} />
                  </a>
                </div>
                <div className={styles._copy}>
                  <img src='images/icons/banana-logo.svg' className={styles._makers} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  ) : null
}

export default Footer
