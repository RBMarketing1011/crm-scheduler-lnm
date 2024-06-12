const CardWithHeaderBtn = ({ children, title, onClick }) =>
{
  return (
    <div className='w-full divide-y divide-gray-200 rounded-lg bg-white shadow-[0_0_10px_lightgrey]'>
      <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
        <p>{ title }</p>
        <p className='text-white bg-primary-300 px-3 py-1 rounded-md hover:bg-primary-500 hover:cursor-pointer'
          onClick={ onClick }
        >
          Add { title }
        </p>
      </div>
      <div className='px-4 py-5 sm:p-6'>
        { children }
      </div>
    </div>
  )
}

export default CardWithHeaderBtn