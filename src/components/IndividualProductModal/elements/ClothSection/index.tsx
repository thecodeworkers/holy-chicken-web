import styles from './styles.module.scss'

const ClothSection = ({ size = true, attributes }) => (
  <div>
    <p className={styles._littleTitle}>DISEÑOS</p>

    <div className={styles._circlesParent}>
      {
        attributes?.nodes[1]?.options.length &&
        attributes?.nodes[1].options.map((res, index) => {
          return (<div className={styles._circleThree} style={{ backgroundColor: res }} key={index}></div>)
        })
      }
    </div>

    {
      size && (
        <div className={styles._sizesParent}>
          {
            attributes?.nodes[0]?.options.length &&
            attributes?.nodes[0]?.options.map((res) => {
              return (
                <div className={styles._row}>
                  <div className={styles._checkParent}>
                    <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                    <p>{res.toUpperCase()}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    }

  </div>
)

export default ClothSection
