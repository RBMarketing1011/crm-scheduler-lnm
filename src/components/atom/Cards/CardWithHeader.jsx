const CardWithHeader = ({ children, title, height }) =>
{
  return (
    <div className='w-full divide-y divide-gray-200 rounded-lg bg-white shadow-[0_0_10px_lightgrey]'>
      <div className="px-4 py-5 sm:px-6">
        { title }
      </div>
      <div className='px-4 py-5 sm:p-6'>
        { children }
      </div>
    </div>
  )
}

export default CardWithHeader