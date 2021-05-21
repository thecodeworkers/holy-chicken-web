import styles from './styles.module.scss'
import { Insta, Twitter, WhatsApp} from '@images/icons'
import Button from '../Button'

const ResponsiveMenu = ({ show = 2 }) => {

  const assignClass = () => {

    console.log(show)
    if(show === 0) return styles._mainStatic
    if(show === 1) return styles._mainIn
    if(show === 2) return styles._mainOut
  }

  return (
    <div className={assignClass()}>
      <div className={styles._content}>
        <div>
          <ul className={styles._list}>
            <li>Home</li>
            <li>About us</li>
            <li>Contacto</li>
            <li>Shop</li>
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
              <img src='images/icons/tcw-logo.svg' width='25px' className={styles._tcwLogo}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveMenu
