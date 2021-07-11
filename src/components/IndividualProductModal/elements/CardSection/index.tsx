import { useDispatch, useSelector } from 'react-redux';
import { setSelection } from '@store/actions';
import styles from './styles.module.scss'
import Extras from './Extras'

const CardSection = ({ attributes }) => {
  const {
    freeFresh,
    freeSauce
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
      <Extras extras={extras} />
    </>
  )
}

export default CardSection
