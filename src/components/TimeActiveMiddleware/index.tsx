import { wrapper } from '@store'
import { getResources } from '@store/actions'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'

function TimeActiveMiddleware(props:any) {
  const [active, setActive] = useState(false)
  const { resource: { general: { general } } } = useSelector((state: any) => state)
  const date=new Date()
  const [day,hour,minute]=[date.getDay(),date.getHours(),date.getMinutes()]
  const [times,horario]=[general.openCloseTime.times,general.openCloseTime.horario.tiempos]
  useEffect(() => {
    if(day!=1){
      if(hour>times[day].horaApertura.split(':')[0]&&hour<times[day].horaCierre.split(':')[0]){
        setActive(true)
      }else if(hour==times[day].horaApertura.split(':')[0]){
        if(minute>=times[day].horaApertura.split(':')[1]){
          setActive(true)
        }
      }else if(hour==times[day].horaCierre.split(':')[0]){
        if(minute<times[day].horaCierre.split(':')[1]){
          setActive(true)
        }
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
            horario.map((item, index) => {
              return (
                <div className={styles._times} key={index}>
                  <p className={styles._subtitle}>{item?.dias}</p>

                  <p className={styles._subtitle}>{item?.horas}</p>
                </div>

              )
            }
            )}
        </div>

      </div>

  )
}

export default TimeActiveMiddleware
