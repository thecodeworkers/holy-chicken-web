import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard, Button, Stepper } from '@components'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setCurrentProduct, setShowModal } from '@store/actions'

const FirstBanner = ({ data, content, resource, reference }) => {

  const { outstanding } = resource

  const router = useRouter()
  const [currentIndex, setcurrentIndex] = useState(1);
  const [newArray, setNewArray] = useState(data)
  const dispatch = useDispatch()
  let interval;

  useEffect(() => {
    changeImage(currentIndex, styles._show)

    return () => clearTimeout(interval)

  }, [currentIndex])

  const changeImage = (index, stylus, auto = true) => {
    newArray.map((res, mapIndex) => { newArray[mapIndex].className = styles._hidden })
    newArray[index].className = stylus

    setNewArray([...newArray])

    const determinateCurrent = () => {
      if (currentIndex < newArray.length - 1) return setcurrentIndex(currentIndex + 1)
      else setcurrentIndex(0)
    }

    if (auto) {
      interval = setTimeout(() => {
        determinateCurrent()
      }, 4000);

      return;
    }

    determinateCurrent()
  }

  const navigation = (route: string) => {
    if (route != router.pathname) {
      router.push(route)
    }
  }

  const openIndividualModal = (item) => {
    dispatch(setShowModal({ individualProductModal: true }))
    dispatch(setCurrentProduct({ currentProduct: item }))
  }

  return (
    <div className={styles._content}>
      <div className={styles._main}>
        {
          Array.from(Array(newArray?.length).keys()).map((index) => {
            const currentClass = index + 1;
            return (
              <div className={newArray[index].className} id={currentClass.toString()} key={index}>
                <div className={`_banner${index}`}>
                  <style jsx>{`
                  ._banner${index} {
                    background-image: url(${newArray[index]?.image?.mediaItemUrl});
                    height: 450px;
                    width: 85vw;
                    background-size:cover
                  }
                  @media(max-width: 576px) {
                    ._banner${index} {
                      background-image: url(${newArray[index]?.responsiveImage?.mediaItemUrl});
                      height: 250px;
                      width: 85vw;
                      background-repeat: no-repeat;
                      background-size:100% 100%
                    }
                  }
                `}</style>
                </div>
              </div>
            )
          })

        }
        <div className={styles._stepperContainer} ref={reference}>
          <div className={styles._stepper}>
            <Stepper currentStep={currentIndex + 1} length={newArray?.length} onPress={index => changeImage(index, styles._show, false)} />

          </div>
        </div>
      </div>
      <div className={styles._cardContainer} >
        <div className={styles._cardContent}>
          <div className={styles._cardHidden}>

            {
              outstanding?.map((item, index) => {
                const spicy = item.spicy.isSpicy
                return (
                  <div className={styles._card} key={index} onClick={() => openIndividualModal(item)}>
                    <GeneralCard
                      name={item?.name}
                      image={item.image?.mediaItemUrl}
                      description={item?.description}
                      price={item?.price}
                      hot={spicy}
                    />
                  </div>
                )

              })
            }

            <div className={styles._space}></div>
          </div>
        </div>
        <div className={styles._textContainer}>
          <p className={styles._title}>{content.title}</p>
          <p className={styles._subtitle}>{content.content}</p>
          <div className={styles._btnParent} onClick={() => navigation('/shop')}>
            <Button color='#FD8C2E' textColor='white' text={content.button.title}></Button>
          </div>
        </div>
      </div>

    </div>

  )
}

export default FirstBanner
