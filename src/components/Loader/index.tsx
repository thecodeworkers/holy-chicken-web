import styles from './styles.module.scss'

const Loader = () => (
  <div className={styles._parent}>
    <div className={styles._circlesParent}>
      {
        Array(8).fill(0).map((item: any, index: number) => {
          return <div key={index} className={styles._circles} />
        })
      }
    </div>
  </div>
)

export default Loader
