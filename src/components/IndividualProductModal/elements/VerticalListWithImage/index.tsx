import styles from './styles.module.scss'

const brands = [
  { path: 'images/resources/coca-cola-light.png' },
  { path: 'images/resources/coca-cola.png' },
  { path: 'images/resources/chinnotto.png' },
  { path: 'images/resources/frescolita.png' }
]

const VerticalListWithImage = ({ attributes }) => {

  console.log(attributes?.nodes[0]?.options)

  return (
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
          attributes?.nodes[0]?.options.length &&
          attributes?.nodes[0]?.options.map((res, index) => {
            return (
              <div className={styles._row} >
                <div className={styles._checkParent} key={index}>
                  <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                  {/* <img src={item?.path} className={styles._image}></img> */}
                  <p className={styles._label}>{res}</p>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )

}

export default VerticalListWithImage
