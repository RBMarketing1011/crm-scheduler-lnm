
const NoData = ({ data }) =>
{
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-1">
      <data.icon className='h-10 w-10 text-primary-300' />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{ data.title }</h3>
      <p className="mt-1 text-sm text-gray-500 text-center">{ data.text }</p>
    </div>
  )
}

export default NoData