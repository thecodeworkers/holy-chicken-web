import { useDispatch, useSelector } from 'react-redux';
import { setSelection } from '@store/actions';
import styles from './styles.module.scss'
import Extras from './Extras'
import { useEffect } from 'react';

const CardSection = ({ attributes }) => {
  const { freeFresh, freeSauce } = useSelector((state: any) => state.product)

  const nodes = attributes?.nodes || [];
  const toopings = [nodes[0], nodes[1]];
  const extras = [nodes[2], nodes[3]];
  const dispatch = useDispatch();

  useEffect(() => {
    if (toopings[0]) dispatch(setSelection({ freeFresh: toopings[0]?.options[0] }))
    if (toopings[1]) dispatch(setSelection({ freeSauce: toopings[1]?.options[0] }))
  }, [attributes])
  return (
    <>

      {
        toopings.map((node, index) => (
          <div key={index}>
            {
              node?.name == 'FRESH N’ HOLY' ? (
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
                          />
                          <p>{option}</p>
                        </div>

                        <div className={styles._priceParent}>
                          <p>$0.00</p>
                        </div>
                      </div>
                    ))
                  }
                </>

              ) : (<>
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
              </>)
            }
          </div>

          // <div key={index}>
          //   {
          //     index == 0 ? (
          //       <>
          //         <p className={styles._littleTitle}>{node?.name}</p>
          //         {
          //           node?.options.map((option, index) => (
          //             <div key={index} className={styles._row}>
          //               <div className={styles._checkParent}>
          //                 <input
          //                   type='radio'
          //                   className={styles._radioBtn}
          //                   value={option}
          //                   checked={freeFresh === option}
          //                   onChange={(event) => dispatch(setSelection({ freeFresh: event.target.value }))}
          //                   ></input>
          //                 <p>{option}</p>
          //               </div>

          //               <div className={styles._priceParent}>
          //                 <p>$0.00</p>
          //               </div>
          //             </div>
          //           ))
          //         }
          //       </>
          //     ) : (
          //       <>
          //         <p className={styles._littleTitle}>{node?.name}</p>
          //         {
          //           node?.options.map((option, index) => (
          //             <div key={index} className={styles._row}>
          //               <div className={styles._checkParent}>
          //                 <input
          //                   type='radio'
          //                   className={styles._radioBtn}
          //                   value={option}
          //                   checked={freeSauce === option}
          //                   onChange={(event) => dispatch(setSelection({ freeSauce: event.target.value }))}
          //                  ></input>
          //                 <p>{option}</p>
          //               </div>

          //               <div className={styles._priceParent}>
          //                 <p>$0.00</p>
          //               </div>
          //             </div>
          //           ))
          //         }
          //       </>
          //     )
          //   }
          // </div>
        ))
      }

      {extras[0] && <Extras extras={extras} />}
    </>
  )
}

export default CardSection
