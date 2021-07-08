import styles from './styles.module.scss'
import { Home } from '@images/icons'
import { useDispatch, useSelector } from 'react-redux'
import { resetModals, setShowModal } from '@store/actions'
import { useRouter } from 'next/router'

const LocationModal = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const { intermitence: { locationModal }, resource: { general: { general } } }= useSelector((state: any) => state)

  const closeModal = (event) => {
    const { target } = event
    if (target.id == 'location-modal') dispatch(setShowModal({ locationModal: false }))
  }

  const navigate = () => {
      dispatch(resetModals())
      router.push('/shop')
  }

  return (
    <div className={locationModal ? styles._background : styles._hidden} id='location-modal' onClick={closeModal}>
      <div className={` ${styles._modal} _generalCard`}>
        <p className={styles._title}>¿Dónde quieres comprar?</p>

        <div className={styles._cardsParent}>
          {
            general.addresses.map((item, index) => {
              return (
                <div className={styles._card} key={index} onClick={navigate}>
                  <div className={styles._topContent}>
                    <div className={styles._home}>
                      <Home color='#000' />
                    </div>
                    <p className={styles._locationTitle}>{item.local}</p>
                    <p className={styles._locationText}>{item.description}</p>
                  </div>
                  <div className={styles._cardFooter}>
                    <p>{item.address}</p>
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
