import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExtras, setSelection, setSpecials } from '@store/actions';
import Counter from '../Counter'
import styles from './styles.module.scss'
import { formatWooCommerceAmount, getVariation } from '@utils';

const CheckBoxes = ({ option, reboot = false, index, price = 0 }) => {

  const { attributes, addons = {} } = useSelector((state: any) => state.product)
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(false)
  }, [reboot])

  const onChangeData = (event) => {
    setChecked(!checked)

    const target = event.target
    const isChecked = target.checked
    const currentValue = target.value

    const addonTarget = addons[index] || []

    if (attributes[index] == 'N/A' && isChecked) {
      dispatch(setSelection({ ...attributes, [index]: currentValue }))
      return
    }

    if (attributes[index] != 'N/A' && !isChecked) {
      if (!addonTarget.length) {
        dispatch(setSelection({ ...attributes, [index]: 'N/A' }))
        return
      }

      const indexAdd = addonTarget.findIndex((addon: any) => addon.extra == currentValue)
      if (indexAdd > -1) {
        addonTarget.splice(indexAdd, 1)
        addons[index] = addonTarget
        dispatch(setSpecials({ addons }))
      }

      return
    }

    if (attributes[index] != 'N/A' && isChecked) {
      addonTarget.push({ extra: currentValue, price: price })
      addons[index] = addonTarget
      dispatch(setSpecials({ addons }))
      return;
    }
  }

  return (
    <div className={styles._column}>
      <div className={styles._checkParent}>
        <input type='checkbox' className={styles._radioBtn} checked={checked} value={option} onChange={onChangeData} />
        <p>{option}</p>
      </div>
    </div>
  )
}

const Extras = ({ extras }) => {
  const [currentSelection, setCurrentSelection] = useState([])
  const { product: { addons, attributes }, intermitence: { individualProductModal }, cart: { currentProduct } } = useSelector((state: any) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    setCurrentSelection([])
  }, [individualProductModal])


  return (
    <div className={styles._cardParent}>
      <div>
        <p className={styles._title}>Extras</p>
      </div>

      <div className={styles._webParent}>
        {
          extras.map((node, nodeIndex) => (
            <div key={nodeIndex}>
              <p className={styles._littleTitleCard}>{node?.name}</p>
              {
                node?.terms?.nodes?.map((option, index) => {

                  const selectedAttributes = []
                  let count = 0

                  for (const key in attributes) {
                    selectedAttributes[count] = { value: 'N/A' }
                    if (key === node?.slug) selectedAttributes[count] = { value: option.name }
                    count++
                  }

                  const result = getVariation(currentProduct, selectedAttributes)
                  let totalP = currentProduct?.price?.includes('-') ? `${currentProduct?.price?.split('-')[0]}` : currentProduct?.price
                  const price = formatWooCommerceAmount(result?.regularPrice) - formatWooCommerceAmount(totalP)

                  return (
                    <div key={index} className={styles._row}>
                      {
                        option.name != 'N/A' ? (
                          <>
                            <CheckBoxes
                              option={option.name}
                              index={node?.slug}
                              reboot={individualProductModal}
                              price={price}
                            />
                            <div className={styles._column}>
                              <Counter
                                stock={30}
                                active={attributes[node.slug] === option.name || addons[node.slug]?.find((addon) => addon.extra === option.name)}
                                reboot={individualProductModal}
                                changeNumber={(action) => {
                                  const addonsType = addons[node?.slug] || []
                                  if (action == 'add') {

                                    addonsType.push({ extra: option.name, price: price })
                                    addons[node?.slug] = addonsType
                                    dispatch(setExtras(addons))
                                  }

                                  if (action == 'remove') {
                                    const index = addonsType.findIndex((addon: any) => addon.extra == option.name)
                                    if (index > -1) addonsType.splice(index, 1)
                                    addons[node?.slug] = addonsType
                                    dispatch(setExtras(addons))
                                  }
                                }}
                              />
                            </div>

                            <div className={styles._column}>
                              <div className={styles._priceParent}>
                                <p>{result ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '$0.50'}</p>
                              </div>
                            </div>
                          </>
                        ) : null
                      }
                    </div>
                  )
                })
              }

            </div>
          ))
        }
      </div>

      {/* RESPONSIVEEEEEEEEEE */}
      <div className={styles._responsiveParent}>
        {
          extras.map((node, nodeIndex) => (
            <div key={nodeIndex}>
              <p className={styles._littleTitle}>{node?.name}</p>
              {
                node?.terms?.nodes?.map((option, index) => {
                  const selectedAttributes = []
                  let count = 0

                  for (const key in attributes) {
                    selectedAttributes[count] = { value: 'N/A' }
                    if (key === node?.slug) selectedAttributes[count] = { value: option.name }
                    count++
                  }

                  const result = getVariation(currentProduct, selectedAttributes)
                  let totalP = currentProduct?.price?.includes('-') ? `${currentProduct?.price?.split('-')[0]}` : currentProduct?.price
                  const price = formatWooCommerceAmount(result?.regularPrice) - formatWooCommerceAmount(totalP)

                  return (
                    <div key={index} className={styles._responsiveRow}>
                      {
                        option.name != 'N/A' ? (
                          <>
                            <CheckBoxes
                              option={option.name}
                              index={node?.slug}
                              reboot={individualProductModal}
                              price={price}
                            />

                            <div className={styles._newParent}>
                              <div className={styles._column}>
                                <Counter
                                  stock={30}
                                  active={currentSelection.some(_ => (_.nodeIndex == nodeIndex && _.index == index))}
                                  reboot={individualProductModal}
                                  changeNumber={(action) => {
                                    if (action == 'add') {
                                      addons[node?.slug].push({ extra: option.name, price: price })
                                      dispatch(setExtras(addons))
                                    }

                                    if (action == 'remove') {
                                      const index = addons[node?.slug].findIndex((addon: any) => addon.extra == option.name)
                                      if (index > -1) addons[node?.slug].splice(index, 1)
                                      dispatch(setExtras(addons))
                                    }
                                  }}
                                />
                              </div>

                              <div className={styles._column}>
                                <div className={styles._priceParentReponsive}>
                                  <p>{result ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '$0.50'}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null
                      }
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Extras
