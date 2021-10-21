import { formatWooCommerceAmount } from './stripeFormat'

export const normalizedArray = response => response ? response : []

export const normalized = response => response ? response : {}

export const actionObject = (type: string, payload = null) => ({ type, payload })

export const paginate = (items: Array<any>, page_number: number = 1, page_size: number = 15) => {
  return items.slice((page_number - 1) * page_size, page_number * page_size);
}

export const scrolling = (reference) => {

  if (reference) {
    const target = reference.current;
    window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  }
}

export const scrollTo = (ref: any, offset = 0) => {
  window.scrollTo({ top: ref.offsetTop - offset, behavior: 'smooth' });
}

export const createMarkup = (text) => { return { __html: text }; }

export const isRetina = () => {
  const query = '(-webkit-min-device-pixel-ratio: 2), n\
    (min--moz-device-pixel-ratio: 2), n\
    (-o-min-device-pixel-ratio: 2/1), n\
    (min-device-pixel-ratio: 2), n\
    (min-resolution: 192dpi), n\
    (min-resolution: 2dppx)';

  return !!window?.matchMedia(query).matches
}

const _getDeep = (data, deep) => {
  if (typeof deep === 'string') {
    data = data[deep];
  }
  if (Array.isArray(deep)) {
    for (let layer in deep) {
      data = data[layer]
      data = data[layer]
    }
  }
  return data
}

export const orderBy = (array, key, type = 'desc', deep = null) => {
  return array.sort((a, b) => {
    a = _getDeep(a, deep);
    b = _getDeep(b, deep);

    if (key === 'price') {
      let newA = formatWooCommerceAmount(a[key])
      let newB = formatWooCommerceAmount(b[key])
      if (newA > newB && type === 'asc') return 1
      if (newA < newB && type === 'asc') return -1
      if (newA < newB && type === 'desc') return 1
      if (newA > newB && type === 'desc') return -1
    }

    if (a[key] > b[key] && type === 'asc') return 1
    if (a[key] < b[key] && type === 'asc') return -1
    if (a[key] < b[key] && type === 'desc') return 1
    if (a[key] > b[key] && type === 'desc') return -1
    return 0
  })
}

export const filter = (nodes: Array<any>, comparison, key, deep = null) => {

  const nodeFilter = (node) => {
    let validation = true
    let validFilter = false
    let select = _getDeep(node, deep)[key]
    validFilter = select === comparison
    if (typeof select === 'string') validFilter = select.toLowerCase().includes(comparison.toLowerCase())
    return validation && validFilter
  }

  return (comparison) ? nodes.filter(nodeFilter) : nodes
}


const getData = (data, type) => {
  switch (type) {
    case 'categories':
      return data['productCategories']['nodes']
    default:
      return _getDeep(data, type)
  }
}

export const productFilter = (nodes: Array<any>, comparison, key) => {

  const nodeFilter = (node) => {
    let validation = true
    let validFilter = false
    for (let type of Object.keys(comparison)) {
      let select = getData(node, type)
      for (let value of select) {
        if (type === 'categories') {
          for (let compare of comparison[type]) {
            if (value[key] === compare) {
              validFilter = true
              break;
            }
          }
        }
      }
    }
    return validation && validFilter
  }
  return (comparison.categories.length) ? nodes.filter(nodeFilter) : nodes
}

export const setCamelCaseKey = (obj) => {
  const newObj = {}
  for (let key in obj) {
    let newKey: any = key.split('_')
    newKey = (newKey[1]) ? `${newKey[0]}${newKey[1][0].toUpperCase()}${newKey[1].slice(1, key.length)}` : newKey[0]
    newObj[newKey] = obj[key]
  }
  return newObj
}

export const formatFee = (fee) => {
  let items = fee.split('-')
  items = items.reduce((back, next) => {
    let newItem = next.split('/')
    newItem = newItem.map(value => {
      if (value.includes(':')) return value.split(':')
      return value
    })
    const productKey = newItem.shift()
    back[productKey] = (Array.isArray(back[productKey])) ? [...back[productKey], ...newItem] : newItem
    return back
  }, {})
  return items
}

export const getProductPrice = (fees, value, key) => {
  if (key in fees) {
    let feePrice = 0
    for (let dataFee of fees[key]) feePrice += Number(dataFee[1])
    const newValue: number = formatWooCommerceAmount(value) + Number(feePrice)
    return `$${newValue.toFixed(2)}`
  }
  return value
}

export const removeandCountDuplicates = (items, fees) => {
    let newArray = []
    items.forEach((item: any) => {
      const selectedArray = fees[item?.key]
      selectedArray.forEach((res: any) => {
        newArray.push(res[0])
      })
    })

    const counts = {}
    newArray.forEach((element) => {
			counts[element] = (counts[element] || 0) + 1;
		})

    const uniqueItems = newArray.filter((item, index) => {
      return newArray.indexOf(item) === index;
    })

    const definitiveArray = uniqueItems.map(res => {
      const index = uniqueItems.indexOf(counts[res])
      return uniqueItems[index] = `${res} x${counts[res]}`
    })

    return definitiveArray
  }
