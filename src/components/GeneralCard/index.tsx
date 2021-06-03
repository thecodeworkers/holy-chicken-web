import styles from './styles.module.scss'
import { Button } from '@components'

const GeneralCard = () => {
  return (
    <div className={styles._parent}>
      <div className={styles._imageParent}>
        <img src='images/resources/burguer.png' width='100%'></img>
      </div>

      <h3>Holy </h3>
      <p>210 gramos de pollo crispy entre pan brioche</p>

      <div className={styles._sectionParent}>
        <p>7$</p>
        <div style={{width:123}}>
        <Button color='#118AC6' textColor='white' text='Agregar' height={'1.9rem'}></Button>
        </div>
      </div>
    </div>
  )
}

export default GeneralCard
