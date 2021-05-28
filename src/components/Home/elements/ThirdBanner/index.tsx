import styles from './styles.module.scss'

const ThirdBanner = ({ data }) => {

  return (
    <div className={styles._content}>

      <p className={styles._blackTitle}>{data?.title}</p>

      <div className={styles._appsContainer}>
        {
          data.commerces.map((item, index) => {
            return (
              <div className={styles._locate} key={index}>
                <a href={item?.link} target='_blank'>
                  <img src={item?.image?.mediaItemUrl} className={styles._image} />
                </a>
              </div>
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default ThirdBanner
