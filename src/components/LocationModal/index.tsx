import styles from './styles.module.scss'
import { Home } from '@images/icons'
import { useDispatch, useSelector } from 'react-redux'
import { resetModals, setShowModal } from '@store/actions'
import { useRouter } from 'next/router'

const locations = [
  {
    title: 'El Hatillo',
    text: 'Calle París de Las Mercedes, entre Calle Nueva York y Calle Caroní',
    location: 'Calle París de Las Mercedes, entre Calle Nueva York y Calle Caroní'
  },

  {
    title: 'Las Mercedes',
    text: 'Calle Bolívar del pueblo de El Hatillo. A una cuadra de la Plaza Bolívar. Quinta Nuti',
    location: 'Calle París de Las Mercedes, entre Calle Nueva York y Calle Caroní'
  },

  {
    title: 'La Castellana',
    text: 'Llama, grita, si nos necesitas y al instante llegará tu comida favorita',
    location: 'Av. Principal de La Castellana, Sector La Castellana.'
  },
]

const LocationModal = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const { intermitence: { locationModal } } = useSelector((state: any) => state)

  const closeModal = (event) => {
    const { target } = event
    // if (target.id == 'location-modal') dispatch(setShowModal({ locationModal: false }))
  }

  const navigate = () => {
    dispatch(resetModals())
    if(router.pathname != '/shop') router.push('/shop')
    dispatch(setShowModal({ showLocationModal: false }))
  }

  return (
    <div className={locationModal ? styles._background : styles._hidden} id='location-modal' onClick={closeModal}>
      <div className={` ${styles._modal} _generalCard`}>
        <p className={styles._title}>¿Dónde quieres comprar?</p>

        <div className={styles._cardsParent}>
          {
            locations.map((item, index) => {
              return (
                <div className={styles._card} key={index} onClick={navigate}>
                  <div className={styles._topContent}>
                    <div className={styles._home}>
                      <Home color='#000' />
                    </div>
                    <p className={styles._locationTitle}>{item.title}</p>
                    <p className={styles._locationText}>{item.text}</p>
                  </div>
                  <div className={styles._cardFooter}>
                    <p>{item.location}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default LocationModal
