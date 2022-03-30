import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

function TimeActiveMiddleware(props) {
  const [active, setActive] = useState(false)
  const times=[
    {
      "day": "Martes - Miercoles y Domingos",
      "hour": "11:30 am - 8:50 pm"
    },
    {
      "day": "Jueves a Sabado",
      "hour": "11:30 am - 10:50 pm"
    }
  ]
  const date=new Date()
  const [day,hour,minute]=[date.getDay(),date.getHours(),date.getMinutes()]
  const activeDays=[
    {
      startHour:11,
      startMinute:30,
      endHour:20,
      endMinute:50
    },
    {
      startHour:11,
      startMinute:30,
      endHour:20,
      endMinute:50
    },
    {
      startHour:11,
      startMinute:30,
      endHour:20,
      endMinute:50
    },
    {
      startHour:11,
      startMinute:30,
      endHour:20,
      endMinute:50
    },
    {
      startHour:11,
      startMinute:30,
      endHour:22,
      endMinute:50
    },
    {
      startHour:11,
      startMinute:30,
      endHour:22,
      endMinute:50
    },
    {
      startHour:11,
      startMinute:30,
      endHour:22,
      endMinute:50
    },
  ]
  useEffect(() => {
    if(day!=1){
      if(hour>=activeDays[day].startHour&&hour<=activeDays[day].endHour){
        if(minute>=activeDays[day].startMinute&&minute<=activeDays[day].endMinute){
          setActive(true)
        }else if(minute<activeDays[day].startMinute&&minute>activeDays[day].endMinute){
          setActive(false)
        }
      }else if(hour<activeDays[day].startHour||hour>activeDays[day].endHour){
        setActive(false)
      }
    }else if(day==1){
      setActive(false)
    }
  }, [])


  return(
    active?
      <div>{props.children}</div>
      :<div className={styles._address}>
        <div className="_titleContent">
          <h1 className={styles._title}>Lo sentimos, no estamos dando servicio. Vuelva luego</h1>
          <p className={styles._title}>{props.data?.schedules?.title}</p>
        </div>
        <div className="_scheduleContent">
          {
            times.map((item, index) => {
              return (
                <div className={styles._times} key={index}>
                  <p className={styles._subtitle}>{item?.day}</p>
                  <p className={styles._subtitle}>{item?.hour}</p>
                </div>
              )
            })
          }
        </div>

      </div>

  )
}

export default TimeActiveMiddleware
