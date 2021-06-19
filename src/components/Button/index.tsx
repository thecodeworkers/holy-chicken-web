import { useEffect } from 'react';
import styles from './styles.module.scss'
import { useSelector } from 'react-redux';

const Button = ({ color, textColor, method = null, text, height = '2.5rem', type = 'button', flag = false }: any) => {

  const { loader } = useSelector((state: any) => state)
  const { requestLoader } = loader

  return (
    <>
    <button className='_button' onClick={method ?? null} type={type}>
        {
          requestLoader && flag ?
          <div className={styles._loader}></div> : text
        }
    </button>
    <style jsx>{`
      ._button {
        background-color: ${color};
        border: 1px solid ${color};
        color: ${textColor};
        padding: 0.5rem 1.5rem;
        border-radius: 1.25rem;
        cursor: pointer;
        font-family: Montserrat-Bold;

        width: 100%;
        height: ${height};
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @media(max-width: 768px) {
        ._button {
          font-size: 0.8rem;
        }
      }
    `}
    </style>
    </>
  )
}

export default Button;

