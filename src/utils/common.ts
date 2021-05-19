import { useRouter } from 'next/router'
// import { setLoader } from '@store/actions'
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

export const createMarkup = (text) => { return {__html: text}; }

// export const navigation = (route, loader = false) => {
//   // const router = useRouter()
//   // const dispatch = useDispatch()

//   if(useRouter().pathname != route) {
//     if(loader) useDispatch()(setLoader(true))
//     useRouter().push(route)
//   }
// }

export const isRetina = () => {
  const query = '(-webkit-min-device-pixel-ratio: 2), n\
    (min--moz-device-pixel-ratio: 2), n\
    (-o-min-device-pixel-ratio: 2/1), n\
    (min-device-pixel-ratio: 2), n\
    (min-resolution: 192dpi), n\
    (min-resolution: 2dppx)';

    return !!window?.matchMedia(query).matches
}
