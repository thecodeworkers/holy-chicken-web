import { memo } from 'react'

const Mail = ({ color }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16">
  <path id="bx-envelope" d="M20,4H4A2,2,0,0,0,2,6V18a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V6A2,2,0,0,0,20,4Zm0,2v.511l-8,6.223L4,6.512V6ZM4,18V9.044l7.386,5.745a1,1,0,0,0,1.228,0L20,9.044,20,18Z" transform="translate(-2 -4)"/>
</svg>


)

export default memo(Mail)
