
const Catering = ({ publicity, reference }) => {

  return (
    <>
      <div className='_publicity' ref={reference}>
        <style jsx>{`
      ._publicity{
        background-image: url(${publicity?.image?.mediaItemUrl});
        background-size: cover;
        background-position: center;
        height: 30vw;
      }

      @media(max-width: 576px) {
        ._publicity {
          background-image: url(${publicity?.responsiveImage?.mediaItemUrl});
          height: 25vh;
        }
      }
    `}</style>
      </div>
    </>
  )
}

export default Catering
