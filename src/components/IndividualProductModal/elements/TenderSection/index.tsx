import { useDispatch, useSelector } from 'react-redux';
import { setTenderSelection } from '@store/actions';
import styles from './styles.module.scss'
import Extras from './Extras'

const TenderSection = ({ attributes }) => {

  const dispatch = useDispatch()
  const { freeSauce, tenderExtras } = useSelector((state: any) => state.tenderProduct)

  const title = attributes?.nodes[0]?.label ?? ''
  const toppings = attributes?.nodes[0]?.options ?? []

  const extras = attributes?.nodes[1]?.options ?? []
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
                  checked={freeSauce === option}
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
