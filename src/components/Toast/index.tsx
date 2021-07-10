import { useEffect } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '@store/actions'

const Toast = ({ status = 0, text = '', icon = 'check' }) => {

  const dispatch = useDispatch()
  const { toast } = useSelector((state: any) => state)

  let timeout

  const currentClass = (status: number = 0) => {
    if (status === 0) return styles._toast
    if (status === 1) {
      timeout = setTimeout(() => {
        dispatch(setToast(toast?.type, toast?.text, 2))
      }, 2000);

      return styles._toastIn
    }
    if (status === 2) return styles._toastOut
  }

  useEffect(() => {
    return () => { clearTimeout(timeout) }
  }, [])

  const returnIcon = (icon) => {
    switch (icon) {
      case 'check':
        return 'images/icons/check.svg'

      case 'error':
        return 'images/icons/error.svg'

      case 'warning':
        return 'images/icons/warning.svg'

      default:
        return 'images/icons/check.svg'
    }
  }

  return (
    <div className={currentClass(status)}>
      <div className={styles._content}>
        {toast?.type && <img src={returnIcon(icon)} width='20px' height='20px' alt='check'></img>}
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Toast;
