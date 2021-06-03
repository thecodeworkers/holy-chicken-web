import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setShowModal } from '@store/actions'

const ModalFrame = ({ children, separation = '5rem' }) => {

  const dispatch = useDispatch()
  const { intermitence: { contactModal }} = useSelector((store: any) => store)

  const closeModal = (event: any) => {
    const { target } = event
    if(target.id == 'close-contact') return dispatch(setShowModal({ contactModal: false }))
  }

  return (
  <>
  <div className={contactModal ? '_parent' : '_hidden'} id='close-contact' onClick={closeModal}>
    <div className={styles._modal}>
      {children}
    </div>
  </div>

  <style>{`
    ._parent {
      width: 100%;
      height: calc(100vh - ${separation});
      background-color: rgba(0,0,0,0.5);
      z-index: 996;
      position: fixed;
      bottom: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      -webkit-backdrop-filter: blur(14px);
      backdrop-filter: blur(14px);
    }

    ._hidden {
      display: none;
    }

    @media (max-width: 992px) {
      ._parent {
        display: block;
        position: fixed;
        padding: 4rem 0;
        top: 3.75rem;
      }
    }
  `}
  </style>
  </>
  )
}

export default ModalFrame;
