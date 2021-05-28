import { memo } from 'react'
import styles from './styles.module.scss'
import { Insta, Twitter, WhatsApp } from '@images/icons'
import Button from '../Button'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { wrapper } from '@store'
import { getResources } from '@store/actions'
import { useDispatch } from 'react-redux'
import { setShowModal } from '@store/actions'

const ResponsiveMenu = ({ show = 0, method }) => {

  const dispatch = useDispatch()
  const router = useRouter()
  const { resource: { general: { general } } } = useSelector((state: any) => state)

  const assignClass = () => {
    if (show === 0) return styles._mainStatic
    if (show === 1) return styles._mainIn
    if (show === 2) return styles._mainOut
  }

  const navigation = (route: string) => {
    if(route == '/contact') {
      dispatch(setShowModal(true))
      method()
      return
    }
    if (route != router.pathname) {
      router.push(route)
      method()
    }
  }

  const activeLink = (route: string) => {
    if (route == router.pathname) return styles._activeLink
    return styles._link
  }

  return (
    <div className={assignClass()}>
      <div className={styles._content}>
        <div>
          {
            general?.header?.mainNavigation.map((item, index) => {
              return (
                <div className={styles._list} key={index}>
                  <p className={activeLink(item?.link)} onClick={() => navigation(item?.link)}>{item.title}</p>
                </div>
              )
            }
            )
          }
        </div>

        <div className={styles._downSection}>
          <div className={styles._socialMediaParent}>
            <div>
              <a href={general?.socialNetworks[0]?.link} target='_blank'>
                <Insta color='#FFF' />
              </a>
            </div>
            <div>
              <a href={general?.socialNetworks[1]?.link} target='_blank'>
                <Twitter color='#FFF' />
              </a>
            </div>
            <div>
              <a href={general?.socialNetworks[2]?.link} target='_blank'>
                <WhatsApp color='#FFF' />
              </a>
            </div>
          </div>

          <div className={styles._buttonsParent}>
            <div onClick={() => navigation('/shop')}>
              <Button textColor='#FFF' text='Pedir Ahora' color='#FD8C2E' height='2.5rem' />
            </div>

            <div onClick={() => navigation('/login')}>
              <Button textColor='#FFF' text='Iniciar Sesión' color='#118AC6' height='2.5rem' />
            </div>
          </div>

          <div className={styles._politicsParent}>
            <p>Política de privacidad</p>

            <div className={styles._separator}>
            </div>

            <p>Términos y condiciones </p>
          </div>

          <div className={styles._copyright}>
            <p>Copyright © Holy Chicken C.A</p>

            <div>
              <img src='images/icons/banana-logo.svg' width='25px'></img>
              <a href='https://www.thecodeworkers.com/' rel='noopener' target='_blank'>
                <img src='images/icons/tcw-logo.svg' width='25px' className={styles._tcwLogo}></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources())
)
export default memo(ResponsiveMenu)
