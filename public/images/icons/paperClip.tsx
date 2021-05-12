import { memo } from 'react'

const PaperClip = ({ color }) => (

<svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 14 20">
  <path id="bx-paperclip" d="M15,0H7A6.933,6.933,0,0,0,2.076,2.076a6.878,6.878,0,0,0,0,9.848A6.933,6.933,0,0,0,7,14h8V12H7a4.949,4.949,0,0,1-3.51-1.49,4.879,4.879,0,0,1,0-7.02A4.949,4.949,0,0,1,7,2h8V2h0a3,3,0,0,1,0,6H7A1.029,1.029,0,0,1,6,7a1,1,0,0,1,.3-.7A.987.987,0,0,1,7,6h8V4H7a3,3,0,0,0,0,6h8a4.989,4.989,0,0,0,3.527-8.528A4.951,4.951,0,0,0,15,0Z" transform="translate(14) rotate(90)"/>
</svg>


)

export default memo(PaperClip)
