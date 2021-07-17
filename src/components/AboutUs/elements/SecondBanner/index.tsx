import styles from './styles.module.scss'
import { Button } from '@components'

const SecondBanner = ({ data }) => {
  return (
    <>
      <div className={styles._container}>
        <div className={'_main'}></div>
        <div className={styles._content}>

          <div className={styles._textContainer}>
            <p className={styles._title}>{data?.title}</p>
            <p className={styles._subtitle}>{data?.content}</p>
            <div className={styles._buttonContainer} >
              <a href={data?.file?.mediaItemUrl || data?.button?.link} rel={"noopener"} target='_blank'>
                <Button color='#000000' textColor='white' text={data?.button?.title}></Button>
              </a>
            </div>
            <p className={styles._advice}>{data?.advice}</p>
          </div>

          <div className={styles._isoContainer}>
            <div className={styles._iso}>
              <img className={styles._img} src={data?.isotype?.mediaItemUrl} alt={data?.isotype?.slug} />
              <p className={styles._slug}>{data?.isotype?.title}</p>
            </div>
            <div className={styles._logo}>
              <img className={styles._emblem} src={data?.emblem?.mediaItemUrl} alt={data?.emblem?.slug} />
              <p className={styles._slugEmblem}>{data?.emblem?.title}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
      ._main{
        background-image: url(${data?.background?.mediaItemUrl});
        background-size: cover;
        background-position: center;
        height: 86vh;
        width:100%
      }

      @media(max-width: 768px) {
        ._main {
          height: 30vh;
        }
      }
    `}</style>
    </>
  )
}

export default SecondBanner
