import styles from './styles.module.scss'
import { Button } from '@components'
import { createMarkup } from '@utils'

const GeneralCard = ({
  name = 'default name',
  description = 'default description',
  image = 'images/resources/burguer.png',
  price = '7$',
  hot = null
}) => {
  return (
    <div className={styles._parent}>
      <div className={styles._imageParent}>
        <img src={image} className={styles._image}></img>
      </div>
      <h3> {name} </h3>
      <div className={styles.textContainer} dangerouslySetInnerHTML={createMarkup(description)}></div>

      <div className={styles._sectionParent}>
        <p>{price?.split('-')[0]}</p>
        <div className={styles._btnParent}>
          <Button color='#118AC6' textColor='white' text='Agregar' height={'1.9rem'}></Button>
        </div>
      </div>

      {
        hot && (<div className={styles._icon}>
          <img src='images/icons/chilipepper.svg' alt='icono de producto picante' width='100%'></img>
        </div>)
      }

    </div>
  )
}

export default GeneralCard
