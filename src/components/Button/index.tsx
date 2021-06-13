

const Button = ({ color, textColor, method = null, text, height = '2.5rem', type = 'button' }: any) => {
  return (
    <>
    <button className='_button' onClick={method ?? null} type={type}>{text}</button>
    <style jsx>{`
      ._button {
        background-color: ${color};
        border: 1px solid ${color};
        color: ${textColor};
        padding: 0.5rem 1.5rem;
        border-radius: 1.25rem;
        cursor: pointer;
        font-family: Montserrat-Bold;
        font-size: 0.9rem;
        width: 100%;
        height: ${height};
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}
    </style>
    </>
  )
}

export default Button;

