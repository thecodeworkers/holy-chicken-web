import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExtras, setSelection, setSpecials } from '@store/actions';
import Counter from '../Counter'
import styles from './styles.module.scss'
import { formatWooCommerceAmount, getVariation } from '@utils';

const CheckBoxes = ({ option, index, nodeIndex, currentSelection, setCurrentSelection, reboot = false, price = 0.5 }) => {

  const { blessing, sauce, blessingAddons, sauceAddons } = useSelector((state: any) => state.product)
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

    const currentIndex = currentSelection.findIndex(_ => (_.nodeIndex == nodeIndex && _.index == index))

    if (currentIndex > -1) {
      currentSelection.splice(currentIndex, 1)
      setCurrentSelection(currentSelection)
    } else {
      currentSelection.push({ nodeIndex, index })
      setCurrentSelection(currentSelection)
    }

    if (nodeIndex == 0) {
      if (blessing == 'N/A' && isChecked) {
        dispatch(setSelection({ blessing: currentValue }))
        return
      }

      if (blessing != 'N/A' && !isChecked) {
        if (!blessingAddons.length) {
          dispatch(setSelection({ blessing: 'N/A' }))
          return
        }

        const index = blessingAddons.findIndex((addon: any) => addon.extra == currentValue)
        if (index > -1) blessingAddons.splice(index, 1)
        dispatch(setSpecials({ blessingAddons }))

        return
      }

      if (blessing != 'N/A' && isChecked) {
        blessingAddons.push({ extra: currentValue, price: price })
        dispatch(setSpecials({ blessingAddons }))

        return;
      }
    }

    if (nodeIndex == 1) {
      if (sauce == 'N/A' && isChecked) {
        dispatch(setSelection({ sauce: currentValue }))
        return
      }

      if (sauce != 'N/A' && !isChecked) {
        if (!sauceAddons.length) {
          dispatch(setSelection({ sauce: 'N/A' }))
          return
        }

        const index = sauceAddons.findIndex((addon: any) => addon.extra == currentValue)
        if (index > -1) sauceAddons.splice(index, 1)
        dispatch(setSpecials({ sauceAddons }))

        return
      }

      if (sauce != 'N/A' && isChecked) {
        sauceAddons.push({ extra: currentValue, price: price })
        dispatch(setSpecials({ sauceAddons }))

        return;
      }
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
  const { product: { addons }, intermitence: { individualProductModal }, cart: { currentProduct } } = useSelector((state: any) => state)

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
                  const amount = currentProduct.attributes?.nodes?.length
                  const selectedAttributes = []

                  for (let i = 0; i < amount; i++) {
                    selectedAttributes[i] = { value: 'N/A' }
                  }
                  const diferential = amount <= 3 ? amount == 1 ? 0 : 1 : 2
                  selectedAttributes[nodeIndex + diferential] = { value: option.name }

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
                              index={index}
                              nodeIndex={nodeIndex}
                              setCurrentSelection={setCurrentSelection}
                              currentSelection={currentSelection}
                              reboot={individualProductModal}
                              price={price}
                            />
                            <div className={styles._column}>
                              <Counter
                                stock={30}
                                active={currentSelection.some(_ => (_.nodeIndex == nodeIndex && _.index == index))}
                                reboot={individualProductModal}
                                changeNumber={(action) => {
                                  if (action == 'add') {
                                    addons.push({ extra: option.name, price: price })
                                    dispatch(setExtras(addons))
                                  }

                                  if (action == 'remove') {
                                    const index = addons.findIndex((addon: any) => addon.extra == option.name)
                                    if (index > -1) addons.splice(index, 1)
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
                  const amount = currentProduct.attributes?.nodes?.length
                  const selectedAttributes = []

                  for (let i = 0; i < amount; i++) {
                    selectedAttributes[i] = { value: 'N/A' }
                  }
                  const diferential = amount <= 3 ? 1 : 2
                  selectedAttributes[nodeIndex + diferential] = { value: option.name }

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
                              index={index}
                              nodeIndex={nodeIndex}
                              setCurrentSelection={setCurrentSelection}
                              currentSelection={currentSelection}
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
                                      addons.push({ extra: option.name, price: price })
                                      dispatch(setExtras(addons))
                                    }

                                    if (action == 'remove') {
                                      const index = addons.findIndex((addon: any) => addon.extra == option.name)
                                      if (index > -1) addons.splice(index, 1)
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
