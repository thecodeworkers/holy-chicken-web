import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setVariableProduct } from '@store/actions'

const VerticalList = ({ attributes, category }) => {

  const dispatch = useDispatch()
  const [currentAttribute, setCurrentAtribute] = useState(attributes?.nodes[0].options[0])

  const { cart: { currentProduct } } = useSelector((state: any) => state)

  const variations = currentProduct?.variations?.nodes ?? []
  const options = attributes?.nodes[0].options ?? []

  console.log('VARIATIONS', variations)

  const compareAttributes = () => {
    let currentItem

    variations.forEach(item => {

      const value = item?.attributes?.nodes[0].value
      if (currentAttribute.toLowerCase() == value.toLowerCase()) currentItem = item
    })

    return currentItem
  }

  useEffect(() => {
    const value = compareAttributes()
    if (value) dispatch(setVariableProduct({ currentVariableProduct: value }))

    return () => {
      dispatch(setVariableProduct({ currentVariableProduct: null }))
    }
  }, [currentAttribute])

  useEffect(() => {
    setCurrentAtribute(attributes?.nodes[0].options[0])
  }, [attributes])

  return (
    <div>
      {
        attributes?.nodes?.length &&
        <div className={styles._titleParent}>
          <p className={styles._littleTitle}>{category == 'bebidas' ? 'MARCA' : 'TEMPTATION'}</p>

          {
            attributes?.nodes.length && (<div className={styles._chooseOneParent}>
              <img src='images/icons/alarm.svg' width='13px' className={styles._icon}></img>
              <p>Debe seleccionar uno</p>
            </div>)
          }

        </div>
      }

      <div className={category != 'bebidas' ? styles._listParent : styles._imgParent}>
        {
          options.length ?
            options?.map((res: any, index: number) => {

              const element = variations[index]

              return (
                <div className={styles._column} key={index}>
                  <div className={styles._checkParent}>
                    <input
                      type='radio'
                      className={styles._radioBtn}
                      readOnly
                      checked={currentAttribute == res ? true : false}
                      onClick={() => setCurrentAtribute(res)}
                    >
                    </input>

                    {
                      category != 'bebidas'
                        ? <p>{res}</p>
                        : <img className={styles._image} src={element?.image?.mediaItemUrl} ></img>
                    }

                  </div>
                </div>
              )
            }) : <div></div>
        }

      </div>
    </div>
  )
}

export default VerticalList
