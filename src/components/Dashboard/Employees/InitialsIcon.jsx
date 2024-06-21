
const InitialsIcon = ({ borderColor, bgColor, textColor, firstInitial, lastInitial }) =>
{
  return (
    <div className={ `flex justify-center items-center text-md ${ textColor } h-8 w-8 rounded-full ${ bgColor } border ${ borderColor }` }>
      { firstInitial }
      { lastInitial }
    </div>
  )
}

export default InitialsIcon