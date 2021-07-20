import styles from './styles.module.scss'
import { useSelector } from 'react-redux'

const Tooltip = ({ top = '0px', bottom = '0px', right = '0px', left = '0px', show, paddinHorizontal, advice = false }) => {

  const { resource: { general: { general } } } = useSelector((state: any) => state)

  const email = general?.email

  return (
    <>
      <div className={show ? '_parent' : '_hidden'}>

        {!advice ?
          <div>

            <p className={styles._text}>
              La contraseña debe contener al menos</p>
            <p className={styles._text}> 8 caracteres, 1 letra mayúscula,1 número,</p>
            <p className={styles._text}> 1 letra minúscula </p>

          </div>
          : <div>
            <p className={styles._textAdvice}>
              Si quieres contactarnos escribe a </p>
            <p className={styles._textAdvice}> {email}</p>
          </div>
        }
        <div className={!advice ? styles._arrowDown : styles._arrowDownRight}></div>
      </div>

      <style jsx>{`
      ._parent {
        background-color: #118AC6;
        padding: 1rem ${paddinHorizontal}rem;
        border-radius: 2.813rem;
        position: absolute;
        max-width: 15.95rem;
        height: 1.875rem;
        top: ${top};
        bottom: ${bottom};
        right: ${right};
        left: ${left};
        display: flex;
        align-items: center;
      }

      @media(max-width:768px) {
        ._parent {
          height: 1.5rem;
        }
      }

      ._hidden {
        display: none
      }
    `}</style>
    </>
  )
}

export default Tooltip;
