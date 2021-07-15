import styles from './styles.module.scss'
import { Button } from '@components'
import { useDispatch } from 'react-redux'
import { setShowModal } from '@store/actions'

const SecondBanner = ({ data, reference }) => {

  const dispatch = useDispatch()
  const locations = data?.locations
  const times = data?.schedules?.times

  const openModal = () => {
    return dispatch(setShowModal({ contactModal: true }))
  }
  return (
    <div className={styles._content} ref={reference} >

      <p className={styles._blackTitle}>{data?.title}</p>

      <p className={styles._blackSubtitle}>{data?.subtitle}</p>

      <div className={styles._addressContainer}>
        <div className={styles._address}>

          {
            locations.map((item, index) => {
              return (
                <div className={styles._locate} key={index}>
                  <p className={styles._title}>{item?.title}</p>

                  <p className={styles._subtitle}>{item?.address}</p>
                </div>

              )
            }
            )}

        </div>
        <div className={styles._address}>
          <p className={styles._title}>{data?.email?.title}</p>
          <a className={styles._link} href={`mailto:${data?.email?.content}`}>
            <p className={styles._subtitle}>{data?.email?.content}</p>
          </a>
        </div>
        <div className={styles._address}>
          <p className={styles._title}>{data?.phone?.title}</p>
          <a className={styles._link} href={`tel:${data?.phone?.content}`}>
            <p className={styles._subtitle}>{data?.phone?.content}</p>
          </a>
        </div>
        <div className={styles._address}>
          <p className={styles._title}>{data?.schedules?.title}</p>
          {
            times.map((item, index) => {
              return (
                <div className={styles._times} key={index}>
                  <p className={styles._subtitle}>{item?.day}</p>

                  <p className={styles._subtitle}>{item?.hour}</p>
                </div>

              )
            }
            )}
        </div>
      </div>
      <div className={styles._buttonContainer} onClick={openModal}>
        <Button color='#FD8C2E' textColor='white' text={data.button.title}></Button>
      </div>

    </div>
  )
}

export default SecondBanner
