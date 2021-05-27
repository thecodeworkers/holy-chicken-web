import styles from './styles.module.scss'

const ModalFrame = ({ children, separation = '5rem' }) => (
  <>
  <div className='_parent'>
    <div className={styles._modal}>
      {children}
    </div>
  </div>

  <style>{`
    ._parent {
      width: 100%;
      height: calc(100vh - ${separation});
      background-color: rgba(0,0,0,0.5);
      z-index: 998;
      position: fixed;
      bottom: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      -webkit-backdrop-filter: blur(14px);
      backdrop-filter: blur(14px);
    }
  `}
  </style>
  </>
)

export default ModalFrame;
