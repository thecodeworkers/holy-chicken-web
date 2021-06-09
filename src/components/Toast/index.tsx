import styles from './styles.module.scss'

const Toast = ({ status = 0, text = '', icon = 'check' }) => {

  const currentClass = (status: number = 0 ) => {
    if(status === 0) return styles._toast
    if(status === 1) return styles._toastIn
    if(status === 2) return styles._toastOut
  }

  return (
    <div className={currentClass(status)}>
      <div className={styles._content}>
        <img src={icon == 'check' ? 'images/icons/check.svg' : 'images/icons/error.svg'} width='20px' height='20px' alt='check'></img>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Toast;
