import { useDispatch, useSelector } from 'react-redux';
import { setSelection } from '@store/actions';
import styles from './styles.module.scss'
import Extras from './Extras'
import { useEffect } from 'react';

const CardSection = ({ attributes }) => {
  const { product: { attributes: stateAttr = {} }, cart: { currentProduct } } = useSelector((state: any) => state)
  const nodes = attributes?.nodes || []
  const toopings = nodes.filter((top) => !top?.name?.toLowerCase().includes('extra'))
  const extras = nodes.filter((top) => top?.name?.toLowerCase().includes('extra'))
  const dispatch = useDispatch();

  const selectVariation = () => {
    const variations = currentProduct?.variations?.nodes || []
    const attrs = currentProduct?.attributes?.nodes || []
    const selectedAttributes = []

    for (const attr of attrs) selectedAttributes.push(stateAttr[attr.slug])

    const variation = variations.reduce((prev, product) => {
      const variationAttr = product?.attributes?.nodes || []
      const selectedAttrVar = []
      for (const value of variationAttr) selectedAttrVar.push(value.value)
      if (JSON.stringify(selectedAttributes) === JSON.stringify(selectedAttrVar)) return product
      return prev
    }, null)
  }
  useEffect(() => {
    selectVariation()
  }, [stateAttr])

  return (
    <>
      {
        toopings.map((node, index) => (
          <div key={index}>
            <p className={styles._littleTitle}>{node?.name}</p>
            {
              node?.terms?.nodes?.map((option, index) => (
                <div key={index} className={styles._row}>
                  <div className={styles._checkParent}>
                    <input
                      type='radio'
                      className={styles._radioBtn}
                      value={option.name}
                      checked={stateAttr[node?.slug] === option.name}
                      onChange={(event) => dispatch(setSelection({ ...stateAttr, [node?.slug]: event.target.value }))}
                    />
                    <p>{option.name}</p>
                  </div>

                  <div className={styles._priceParent}>
                    <p>$0.00</p>
                  </div>
                </div>
              ))
            }
          </div>
        ))
      }

      {extras[0] && <Extras extras={extras} />}
    </>
  )
}

export default CardSection
