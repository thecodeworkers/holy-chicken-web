import styles from './styles.module.scss'
import { CountProduct } from '@components'
import { useDispatch, useSelector } from 'react-redux';
import { setSelection } from '@store/actions';

const CardSection = ({ attributes }) => {
  const { freeFresh, freeSauce, blessing, sauce } = useSelector((state: any) => state.product)

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
            extras.map((node, index) => (
              <div key={index}>
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
                                    type='radio'
                                    className={styles._radioBtn}
                                    value={option}
                                    defaultChecked={false}
                                  ></input>
                                  <p>{option}</p>
                                </div>
                              </div>

                              <div className={styles._column}>
                                <CountProduct />
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
