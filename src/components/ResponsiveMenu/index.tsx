import { useEffect } from 'react'
import styles from './styles.module.scss'
import { Insta, Twitter, WhatsApp} from '@images/icons'
import Button from '../Button'
import { useRouter } from 'next/router'

const ResponsiveMenu = ({ show = 0, method }) => {

  const router = useRouter()

  const assignClass = () => {
    if(show === 0) return styles._mainStatic
    if(show === 1) return styles._mainIn
    if(show === 2) return styles._mainOut
  }

  const navigation = (route: string) => {
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
          <ul className={styles._list}>
            <li className={activeLink('/')} onClick={() => navigation('/')}>Home</li>
            <li className={activeLink('/about-us')} onClick={() => navigation('/about-us')}>About us</li>
            <li className={activeLink('/contact')} onClick={() => navigation('/contact')}>Contacto</li>
            <li className={activeLink('/shop')} onClick={() => navigation('/shop')}>Shop</li>
          </ul>
        </div>

        <div className={styles._downSection}>
          <div className={styles._socialMediaParent}>
            <div>
              <Insta color='#FFF'/>
            </div>
            <div>
              <Twitter color='#FFF'/>
            </div>
            <div>
              <WhatsApp color='#FFF'/>
            </div>
          </div>

          <div className={styles._buttonsParent}>
            <div>
             <Button textColor='#FFF' text='Pedir Ahora' color='#FD8C2E' height='2.5rem'/>
            </div>

            <div>
              <Button textColor='#FFF' text='Iniciar Sesión' color='#118AC6' height='2.5rem'/>
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

export default ResponsiveMenu
