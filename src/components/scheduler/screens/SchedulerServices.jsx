//dependencies
import Image from 'next/image'

//components

//images

//icons


const SchedulerServices = ({ data, handleClick, selected }) =>
{

  return (
    <div
      className={ `w-[100%] sm:w-[48%] h-[75px] ${ selected.some(p => { return p.name === data.name }) ? 'bg-primary-300 text-white' : 'bg-white' } rounded-md p-3 flex justify-start items-center gap-2 hover:cursor-pointer shadow-[0_0_10px_#808080] transition-all ease-in-out` }
      onClick={ () => handleClick(data) }
    >
      <Image
        src={ `/icons/${ data.icon }` }
        width={ 40 }
        height={ 40 }
        alt='Services Icon'
      />
      <div className='flex flex-col justify-center items-start'>
        <h2 className={ `${ selected.some(p => { return p.name === data.name }) ? 'text-white' : 'text-primary-300' } font-bold transition-all ease-in-out` }>{ data.name }</h2>
        <p className='text-xs font-semibold leading-none'>{ data.desc }</p>
      </div>
    </div>
  )
}

export default SchedulerServices