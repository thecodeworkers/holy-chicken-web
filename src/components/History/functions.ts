export const parseDate = (date) => {
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()

  return `${month}/${day}/${year}`
}

export const parseHour = (date) => {
  const newDate = new Date(date)
  let hours = newDate.getHours()
  let minutes: any = newDate.getMinutes()
  let ampm = hours >= 12 ? 'PM' : 'AM '
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? `0${minutes}` : minutes
  let strTime = `${hours}:${minutes} ${ampm}`
  return strTime
}
