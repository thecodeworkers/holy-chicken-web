import styles from './styles.module.scss'

const ClothSection = ({ size = true }) => (
  <div>
    <p className={styles._littleTitle}>DISEÑOS</p>
    <div className={styles._circlesParent}>
      <div className={styles._circleOne}></div>
      <div className={styles._circleTwo}></div>
      <div className={styles._circleThree}></div>
    </div>


    {
      size && (
        <div className={styles._sizesParent}>
        <div className={styles._row}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
            <p>XS</p>
          </div>
        </div>

        <div className={styles._row}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
            <p>S</p>
          </div>
        </div>

        <div className={styles._row}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={true}></input>
            <p>M</p>
          </div>
        </div>

        <div className={styles._row}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
            <p>L</p>
          </div>
        </div>

        <div className={styles._row}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
            <p>XL</p>
          </div>
        </div>
      </div>
      )
    }

  </div>
)

export default ClothSection
