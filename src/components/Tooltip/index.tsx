import styles from './styles.module.scss'

const Tooltip = ({ top = '0px', bottom = '0px', right = '0px', left = '0px', show}) => {
  return (
    <>
    <div className={show ? '_parent' : '_hidden'}>
      <p className={styles._text}>La contraseña debe contener al menos
        <strong> 8 caracteres, 1 letra mayúscula,
        1 número, 1 letra minúscula
        </strong>
      </p>
      <div className={styles._arrowDown}></div>
    </div>

    <style jsx>{`
      ._parent {
        background-color: #118AC6;
        padding: 1rem 1.5rem;
        border-radius: 2.813rem;
        position: absolute;
        max-width: 15.625rem;
        height: 1.875rem;
        top: ${top};
        bottom: ${bottom};
        right: ${right}
        left: ${left};
      }

      ._hidden {
        display: none
      }

    `}</style>
    </>
  )
}

export default Tooltip;
