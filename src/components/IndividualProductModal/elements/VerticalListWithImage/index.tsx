import styles from './styles.module.scss'

const brands = [
  { path: 'images/resources/coca-cola-light.png' },
  { path: 'images/resources/coca-cola.png' },
  { path: 'images/resources/chinnotto.png' },
  { path: 'images/resources/frescolita.png' }
]

const VerticalListWithImage = () => (
  <div>
    <div className={styles._titleParent}>
      <p className={styles._littleTitle}>MARCA</p>

      <div className={styles._chooseOneParent}>
        <img src='images/icons/alarm.svg' width='13px' className={styles._icon}></img>
        <p>Debe seleccionar uno</p>
      </div>
    </div>


  <div className={styles._imgParent}>
    {
        brands.map((item, index) => {
          return (
            <div className={styles._row} key={index}>
            <div className={styles._checkParent}>
              <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
              <img src={item?.path} className={styles._image}></img>
            </div>
          </div>
          )
        })
      }
  </div>

  </div>
)

export default VerticalListWithImage
