import styles from './styles.module.scss'

const ThirdBanner = ({ data }) => {

  return (
    <div className={styles._content}>
      <div className={styles._imageContainer}>
        <img src={data?.publicBanner?.mediaItemUrl} alt={data?.publicBanner?.slug} />
      </div>
      <div className={styles._imageResponsiveContainer}>
        <img src={data?.publicBannerResponsive?.mediaItemUrl} alt={data?.publicBannerResponsive?.slug} />
      </div>
    </div>
  )
}

export default ThirdBanner
