import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTenderSelection, setVariableProduct } from '@store/actions';
import styles from './styles.module.scss'
import Extras from './Extras'

const TenderSection = ({ attributes }) => {

  const dispatch = useDispatch()
  const { freeSauce, tenderExtra, currentExtra } = useSelector((state: any) => state.tenderProduct)

  const { cart: { currentProduct } } = useSelector((state: any) => state)

  const variations = currentProduct?.variations?.nodes ?? []

  const title = attributes?.nodes[0]?.label ?? ''
  const toppings = attributes?.nodes[0]?.options ?? []

  const extras = attributes?.nodes[1]?.options ?? []

  useEffect(() => {

    let selectedProduct

    variations.forEach(product => {
      const valueOne = product?.attributes?.nodes[0].value
      const valueTwo = product?.attributes?.nodes[1].value

      if(valueOne == freeSauce && valueTwo == currentExtra) selectedProduct = product
    })

    if(selectedProduct) dispatch(setVariableProduct({ currentVariableProduct: selectedProduct }))

    return () =>  { dispatch(setVariableProduct({ currentVariableProduct: null })) }

  }, [freeSauce, currentExtra])

  return (
    <>
      <>
        <p className={styles._littleTitle}>{title}</p>
        {
          toppings?.map((option, index) => (
            <div key={index} className={styles._row}>
              <div className={styles._checkParent}>
                <input
                  type='radio'
                  className={styles._radioBtn}
                  value={option}
                  checked={freeSauce === option ? true : false}
                  onChange={(event) => dispatch(setTenderSelection({ freeSauce: event.target.value }))}
                ></input>
                <p>{option}</p>
              </div>

              <div className={styles._priceParent}>
                <p>$0.00</p>
              </div>
            </div>
          ))
        }
      </>

       <Extras extras={extras} />
    </>
  )
}

export default TenderSection
