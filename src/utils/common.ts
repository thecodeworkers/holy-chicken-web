import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

export const normalizedArray = response => response ? response : []

export const normalized = response => response ? response : {}

export const actionObject = (type: string, payload = null) => ({ type, payload })

export const paginate = (items: Array<any>, page_number: number = 1, page_size: number = 15) => {
  return items.slice((page_number - 1) * page_size, page_number * page_size);
}

export const scrolling = (reference) => {

  if(reference) {
    const target = reference.current;
    window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  }
}

export const scrollTo = (ref: any) => {
  window.scrollTo({ top: ref.offsetTop, behavior: 'smooth' });
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

export const formatWooCommerceAmount = (amount: string): number => {
  if (amount) {
    amount = amount.replaceAll(',', '')
    amount = amount.replaceAll('$', '')
    return Number(amount)
  }
  return 0
}
