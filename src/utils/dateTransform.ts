export const now = () => new Date()

export const getDate = (data) => new Date(data)

export const getDateString = (data) => {
  data = new Date(data)
  return data.toString()
}

export const getMonthDay = (data) => {
  const date = getDateString(data).split(' ')
  const monthString = date[1]
  const day = date[2]
  return `${monthString} ${day}`
}

export const getHour = (data) => {
  data = new Date(data)
  const minutes = data.getMinutes()
  let hour = data.getHours()
  hour = (hour > 12) ? hour - 12 : (hour === 0) ? 12 : hour
  const afternoon = (data.getHours() > 11) ? 'pm' : 'am'
  return `${hour}:${minutes} ${afternoon}`
}

export const formatHour = (data) => {
  data = data.split(':')
  let hour: any = Number(data[0])
  let min: any = Number(data[1])
  hour = (hour > 12) ? hour - 12 : (hour === 0) ? 12 : hour
  min = min < 10 ? `0${min}` : min
  const afternoon = (Number(data[0]) > 11) ? 'pm' : 'am'
  return `${hour}:${min} ${afternoon}`
}

export const formatHHMM = (data) => {
  data = data.split(':')
  let hour: any = Number(data[0])
  let min: any = Number(data[1])
  hour = hour < 10 ? `0${hour}` : hour
  min = min < 10 ? `0${min}` : min
  return `${hour}:${min}`
}

export const getFullTime = (data, separator, rem = null, add = null) => {
  const time = new Date(data)
  let year = time.getFullYear()
  let month: any = time.getMonth() + 1
  let day: any = time.getDate() + 1
  month = (month < 10) ? `0${month}` : month


  if (rem) {
    day = day - rem
    time.setFullYear(year)
  }
  if (add) {
    day = day + add
    time.setFullYear(year)
  }

  day = (day < 10) ? `0${day}` : day

  return `${year}${separator}${month}${separator}${day}`
}

export const getFormatString = (data) => {
  const time = new Date(data)
  let string: any = time.toDateString()
  string = string.split(' ')
  string.shift()
  string = string.join(' ')
  return string
}

export const getHHMM = (date) => {

  date = new Date(date)

  let hour = date.getHours()
  let min = date.getMinutes()
  hour = hour < 10 ? `0${hour}` : hour
  min = min < 10 ? `0${min}` : min

  return `${hour}:${min}`
}

export const getTimeZone = (data) => {
  data = new Date(data)
  data = data.toString()
  data = data.split(' ')
  data = data[6]
  data = data.replace(/\(/g, '')
  data = data.replace(/\)/g, '')
  return data
}

export const getWeekday = (data) => {
  const date = getDateString(data).split(' ')
  return `${date[0]}`
}
