const Card = ({ children, width }) =>
{
  return (
    <div className={ `w-full xl:w-[${ width }] overflow-hidden rounded-lg bg-white shadow-lg` }>
      <div className="px-4 py-5 sm:p-6">
        { children }
      </div>
    </div>
  )
}

export default Card