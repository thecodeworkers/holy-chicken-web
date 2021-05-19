

const Button = ({ color, textColor, method = null, text }) => {
  return (
    <>
    <button className='_button' onClick={method ?? null}>{text}</button>

    <style jsx>{`
      ._button {
        background-color: ${color};
        border: 1px solid ${color};
        color: ${textColor};
        padding: 0.5rem 1.5rem;
        border-radius: 1.25rem;
        cursor: pointer;
        font-family: Montserrat-Bold;
      }
    `}
    </style>
    </>
  )
}

export default Button;

