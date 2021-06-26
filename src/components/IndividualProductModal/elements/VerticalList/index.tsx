import styles from './styles.module.scss'

const VerticalList = () => (
  <div>
    <div>
      <p className={styles._littleTitle}>TEMPTATION</p>
    </div>

    <div className={styles._listParent}>
      <div className={styles._column}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
            <p>Chocolate</p>
          </div>
        </div>

        <div className={styles._column}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
            <p>Chips</p>
          </div>
        </div>

        <div className={styles._column}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
            <p>Doble Chocolate</p>
          </div>
        </div>
    </div>

  </div>
)

export default VerticalList
