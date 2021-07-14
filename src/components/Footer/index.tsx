import styles from './styles.module.scss'
import React from 'react'
import { ChickenLogo } from '@images/resources'
import { Insta, WhatsApp, Twitter } from '@images/icons'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader, setShowModal, seletedReference } from '@store/actions'

const Footer = ({ data, content }) => {

  const router = useRouter()
  const dispatch = useDispatch()
  const { scrollReference } = useSelector((state: any) => state)

  const navigation = (...args) => {

    if (args[0] == '/login') return dispatch(setShowModal({ loginModal: true }))
    if (args[0] == '/contact') return dispatch(setShowModal({ contactModal: true }))
    if (router.pathname != args[0]) {
      if (args[1]) dispatch(seletedReference({ [args[2]]: { current: args[1] } }))
      router.push(args[0])

      return;
    }
    if (args[1]) {
      dispatch(seletedReference({
        [args[2]]: {
          current: args[1],
          [args[1]]: !scrollReference.homeReference[args[1]]
        }
      }))
    }
    if (args[1] == 'menu') {
      dispatch(seletedReference({
        [args[2]]: {
          current: args[1],
          [args[1]]: !scrollReference.shopReference[args[1]]
        }
      }))
    }
  }
  const clickOption = (route, reference = null, key = '') => {


    navigation(route, reference, key)
    // onPress()
  }

  return content ? (
    <>
      <footer className={styles._footerContainer}>
        <div className={styles._footer}>

          <div className={styles._content}>
            <div className={styles._logoMain} onClick={() => clickOption('/', 'outstanding', 'homeReference')} >
              <ChickenLogo color='#fff' />
            </div>
            <div className={styles._textContainer}>
              <p className={styles._title}>{data?.footerTitle}</p>
              <p className={styles._subtitle}>{data?.footerSubtitle}</p>
            </div>
            <div className={styles._links}>
              <div>
                <p onClick={() => clickOption('/contact')} className={styles._link} >Contáctanos</p>
              </div>
              <div>
                <p onClick={() => clickOption('about-us')} className={styles._link} >About us</p>
              </div>
              <div>
                <p onClick={() => clickOption('/', 'outstanding', 'homeReference')} className={styles._link} >Destacados</p>
              </div>
              <div>
                <p onClick={() => clickOption('/', 'catering', 'homeReference')} className={styles._link} >Catering</p>
              </div>
              <div>
                <p onClick={() => clickOption('/', 'location', 'homeReference')} className={styles._link} >Location</p>
              </div>
              <div>
                <p onClick={() => clickOption('/shop', 'menu', 'shopReference')} className={styles._link} >Menú</p>
              </div>
              <div>
                <p onClick={() => clickOption('/login')} className={styles._link} >Login</p>
              </div>
              {/* {
                data?.footerNavigation.map((item, index) => {
                  return (
                    <div key={index}>
                      <p onClick={() => clickOption(item.link, 'homeReference')} className={styles._link} >{item?.titulo}</p>
                    </div>
                  )
                }
                )
              } */}
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
                  <a href='https://www.instagram.com/_bananacreative/' >
                    <img src='images/icons/banana-logo.svg' className={styles._makers} />
                  </a>
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
