import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard, Button, Stepper } from '@components'

const FirstBanner = ({ data, content, publicity}) => {


  const [currentIndex, setcurrentIndex] = useState(1);
  const [newArray, setNewArray] = useState(data)
  const [responsive, setResponsive] = useState('');
  const [path, setPath] = useState('');
  let interval;

  useEffect(() => {
    if(window.innerWidth <= 576) setResponsive('576');
     if(window.innerWidth > 577) setResponsive('580');
    window.addEventListener('resize', checkWidth);

    setPath(window.location.pathname)
    return () => window.removeEventListener('resize', checkWidth);
  }, [responsive]);

  const checkWidth = () => {
    if(window.matchMedia('(max-width: 576px) and (min-width: 370px)').matches) return setResponsive('576');
   if(window.matchMedia('(min-width: 577px)').matches) return setResponsive('580');
  };


  useEffect(() => {
    changeImage(currentIndex, styles._show)

    return () => clearTimeout(interval)

  }, [currentIndex])

  const changeImage = (index, stylus) => {
    newArray.map((res, mapIndex) => { newArray[mapIndex].className = styles._hidden })
    newArray[index].className = stylus

    setNewArray([...newArray])

    interval = setTimeout(() => {
      if (currentIndex < newArray.length - 1) return setcurrentIndex(currentIndex + 1)
      else setcurrentIndex(0)
    }, 4000);
  }

  return (
    <>
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
                      width: 85vw
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
    <div className={styles._stepperContainer}>
        <div className={styles._stepper}>
          <Stepper currentStep={currentIndex+1} length={newArray?.length} onPress={() => changeImage(currentIndex, newArray.className)}/>
        </div>
      </div>
      </div>
      <div className={styles._cardContainer}>
        <div className={styles._cardContent}>
          <div className={styles._cardHidden}>
            <div className={styles._card}>
              <GeneralCard />
            </div>
            <div className={styles._card}>
              <GeneralCard />
            </div>
            <div className={styles._card}>
              <GeneralCard />
            </div>

            <div style={{width: 30, height: 100, margin: 20}}>

            </div>
          </div>
        </div>
        <div className={styles._textContainer}>
          <p className={styles._title}>{content.title}</p>
          <p className={styles._subtitle}>{content.content}</p>
          <Button color='#FD8C2E' textColor='white' text={content.button.title}></Button>
        </div>
      </div>

    </div>
    <div className='_publicity'>
      <style jsx>{`
      ._publicity{
        background-image: url(${publicity?.image?.mediaItemUrl});
        background-size: cover;
        background-position: center;
        height: 30vw;
      }

      @media(max-width: 576px) {
        ._publicity {
          background-image: url(${publicity?.responsiveImage?.mediaItemUrl});
          height: 25vh;
        }
      }
    `}</style>
    </div>
   </>
  )
}

export default FirstBanner
