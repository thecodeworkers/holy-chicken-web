import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExtras, setTenderExtras, setTenderSelection } from '@store/actions';
import Counter from '../Counter'
import styles from './styles.module.scss'

const CheckBoxes = ({ option, index, currentSelection, setCurrentSelection }) => {

  const { currentExtra, tenderExtras } = useSelector((state: any) => state.tenderProduct)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if(!tenderExtras.length)  dispatch(setTenderSelection({ currentExtra: 'N/A' }))
  // }, [tenderExtras])

  return (
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

            const currentIndex = currentSelection.findIndex(_ => _.index == index)

            if (currentIndex > -1) {
              currentSelection.splice(currentIndex, 1)
              setCurrentSelection(currentSelection)
            } else {
              currentSelection.push({ index })
              setCurrentSelection(currentSelection)
            }

            if (currentExtra == 'N/A' && isChecked) {
              dispatch(setTenderSelection({ currentExtra: currentValue }))
              return
            }

            if (currentExtra != 'N/A' && !isChecked) {
              const index = tenderExtras.findIndex((addon: any) => addon.extra == currentValue)
              if (index > -1) tenderExtras.splice(index, 1)
              dispatch(setTenderExtras({ tenderExtras }))

              if (!tenderExtras.length) {
                dispatch(setTenderSelection({ currentExtra: 'N/A' }))
                return
              }

              return
            }

            if (currentExtra != 'N/A' && isChecked) {

              tenderExtras.push({ extra: currentValue, price: 0.5 })
              dispatch(setTenderExtras({ tenderExtras }))
              return
            }

          }}
        ></input>
        <p>{option}</p>
      </div>
    </div>
  )
}

const Extras = ({ extras }) => {
  const [currentSelection, setCurrentSelection] = useState([])
  const { tenderExtras } = useSelector((state: any) => state.tenderProduct)
  const dispatch = useDispatch()

  return (
    <div className={styles._cardParent}>
      <div>
        <p className={styles._title}>Extras</p>
      </div>

      <div className={styles._webParent}>
        {
          extras?.map((option, index) => {
            return (
              <div key={index} className={styles._row}>
                {
                  option != 'N/A' ? (
                    <>
                      <CheckBoxes
                        option={option}
                        index={index}
                        setCurrentSelection={setCurrentSelection}
                        currentSelection={currentSelection}
                      />
                      <div className={styles._column}>
                        <Counter
                          stock={30}
                          active={currentSelection.some(_ => _.index == index)}
                          changeNumber={(action) => {
                            if (action == 'add') {
                              tenderExtras.push({ extra: option, price: 0.5 })
                              dispatch(setTenderExtras(tenderExtras))
                            }

                            if (action == 'remove') {
                              const index = tenderExtras.findIndex((addon: any) => addon.extra == option)
                              if (index > -1) tenderExtras.splice(index, 1)
                              dispatch(setTenderExtras(tenderExtras))
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
      <div className={styles._responsiveParent}>
        {
          extras.map((node, nodeIndex) => (
            <div key={nodeIndex}>
              <p className={styles._littleTitle}>{node?.name}</p>
              {
                node?.options?.map((option, index) => (
                  <div key={index} className={styles._responsiveRow}>
                    {
                      option != 'N/A' ? (
                        <>
                          <CheckBoxes
                            option={option}
                            index={index}
                            setCurrentSelection={setCurrentSelection}
                            currentSelection={currentSelection}
                          />

                          <div className={styles._newParent}>
                            <div className={styles._column}>
                              {/* <Counter
                                stock={30}
                                active={currentSelection.some(_ => (_.nodeIndex == nodeIndex && _.index == index))}
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
                              /> */}
                            </div>

                            <div className={styles._column}>
                              <div className={styles._priceParentReponsive}>
                                <p>$0.50</p>
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
  )
}

export default Extras
