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
    console.log(args);

    if (args[0] == '/login') return dispatch(setShowModal({ loginModal: true }))
    if (args[0] == '/contact') return dispatch(setShowModal({ contactModal: true }))
     if (router.pathname != args[0]) {
      if (args[1]) dispatch(setLoader(true))
      if (args[2]) dispatch(seletedReference({ [args[3]]: { current: args[2] } }))
      router.push(args[0])

    if (args[2]) {
       dispatch(seletedReference({
         [args[3]]: {
           current: args[2],
           [args[2]]: !scrollReference.forYouReference[args[2]]
         }
       }))
     }
  }
}
  const clickOption = (route, loader: boolean = false, reference = null, key = '') => {


    navigation(route, loader, reference, key)
    // onPress()
  }

  return content ? (
    <>
      <footer className={styles._footerContainer}>
        <div className={styles._footer}>

          <div className={styles._content}>
            <div className={styles._logoMain} onClick={() => clickOption('/', true)} >
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
                      <p onClick={() => clickOption(item.link, true)} className={styles._link} >{item?.titulo}</p>
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
