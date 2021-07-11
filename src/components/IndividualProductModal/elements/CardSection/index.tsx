import styles from './styles.module.scss'
import { CountProduct } from '@components'
import { useDispatch, useSelector } from 'react-redux';
import { setExtras, setSelection, setSpecials } from '@store/actions';

const CardSection = ({ attributes }) => {
  const {
    freeFresh,
    freeSauce,
    blessing,
    sauce,
    addons,
    blessingAddons,
    sauceAddons
  } = useSelector((state: any) => state.product)

  const nodes = attributes?.nodes || [];
  const toopings = [nodes[0], nodes[1]];
  const extras = [nodes[2], nodes[3]];

  const dispatch = useDispatch();

  return (
    <>
      {
        toopings.map((node, index) => (
          <div key={index}>
            {
              index == 0 ? (
                <>
                  <p className={styles._littleTitle}>{node?.name}</p>
                  {
                    node?.options.map((option, index) => (
                      <div key={index} className={styles._row}>
                        <div className={styles._checkParent}>
                          <input
                            type='radio'
                            className={styles._radioBtn}
                            value={option}
                            checked={freeFresh === option}
                            onChange={(event) => dispatch(setSelection({ freeFresh: event.target.value }))}
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
              ) : (
                <>
                  <p className={styles._littleTitle}>{node?.name}</p>
                  {
                    node?.options.map((option, index) => (
                      <div key={index} className={styles._row}>
                        <div className={styles._checkParent}>
                          <input
                            type='radio'
                            className={styles._radioBtn}
                            value={option}
                            checked={freeSauce === option}
                            onChange={(event) => dispatch(setSelection({ freeSauce: event.target.value }))}
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
              )
            }
          </div>
        ))
      }
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
                  node?.options.map((option, index) => {
                    return  (
                      <div key={index} className={styles._row}>
                        {
                          option != 'N/A' ? (
                            <>
                              <div className={styles._column}>
                                <div className={styles._checkParent}>
                                  <input
                                    type='checkbox'
                                    className={styles._radioBtn}
                                    value={option}
                                    onChange={(event) => {
                                      const target = event.target
                                      const isChecked = target.checked
                                      const currentValue = target.value

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
                                          blessingAddons.push({ extra: currentValue, price: 0.5 })
                                          dispatch(setSpecials({ blessingAddons }))

                                          return ;
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
                                          sauceAddons.push({ extra: currentValue, price: 0.5 })
                                          dispatch(setSpecials({ sauceAddons }))

                                          return ;
                                        }
                                      }
                                    }}
                                  ></input>
                                  <p>{option}</p>
                                </div>
                              </div>

                              <div className={styles._column}>
                                <CountProduct
                                  stock={30}
                                  fixed
                                  changeNumber={(action) => {
                                    if (action == 'add') {
                                      addons.push({ extra: option, price: 0.5 })
                                      dispatch(setExtras(addons))
                                    }

                                    if (action == 'remove') {
                                      const index = addons.findIndex((addon: any) => addon.extra == option)
                                      if (index > -1) addons.splice(index, 1)
                                      dispatch(setExtras(addons))
                                    }
                                  }}
                                />
                              </div>

                              <div className={styles._column}>
                                <div className={styles._priceParent}>
                                  <p>$0.50</p>
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
            extras.map((node, index) => (
              <div key={index}>
                <p className={styles._littleTitle}>{node?.name}</p>
                {
                  node?.options.map((option, index) => (
                    <div key={index} className={styles._responsiveRow}>
                      {
                        option != 'N/A' ? (
                          <>
                            <div className={styles._column}>
                              <div className={styles._checkParent}>
                                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                                <p>{option}</p>
                              </div>
                            </div>

                            <div className={styles._newParent}>
                              <div className={styles._column}>
                              <CountProduct />
                              </div>

                              <div className={styles._column}>
                                <div className={styles._priceParentReponsive}>
                                  <p>$0.00</p>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null
                      }
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default CardSection
