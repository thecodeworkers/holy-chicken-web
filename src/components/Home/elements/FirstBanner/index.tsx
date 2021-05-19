import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard, Button } from '@components'

const FirstBanner = ({ data, content }) => {

  const [currentIndex, setcurrentIndex] = useState(1);
  const [newArray, setNewArray] = useState(data)

  let interval;


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
    <div className={styles._content}>
      <div className={styles._main}>
        {
          Array.from(Array(newArray?.length).keys()).map((index) => {
            const currentClass = index + 1;
            return (
              <div className={newArray[index].className} id={currentClass.toString()} key={index}>
                <img src={newArray[index]?.image?.mediaItemUrl} className={styles._img}></img>
              </div>
            )
          })
        }
      </div>
      <div className={styles._cardContainer}>
        <div className={styles._card}>
          <GeneralCard />
        </div>
        <div className={styles._textContainer}>
          <p>{content.title}</p>
          <p>{content.content}</p>
          <Button color='#118AC6' textColor='white' text={content.button.title}></Button>
        </div>
      </div>
    </div>
  )
}

export default FirstBanner
