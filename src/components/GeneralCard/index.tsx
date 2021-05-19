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
        <Button color='#118AC6' textColor='white' text='Agregar'></Button>
      </div>
    </div>
  )
}

export default GeneralCard
