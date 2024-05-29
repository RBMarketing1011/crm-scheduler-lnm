'use client'

//dependencies
import Image from 'next/image'
import { useState } from 'react'

//components

//images

//icons


const SchedulerServices = ({ data, handleClick }) =>
{
  const [ clicked, setClicked ] = useState(false)

  return (
    <div
      className={ `w-[100%] sm:w-[48%] h-[75px] ${ clicked ? 'bg-primary-300' : 'bg-white' } rounded-md p-3 flex justify-start items-center gap-2 hover:cursor-pointer shadow-[0_0_10px_#808080] transition-all ease-in-out` }
      onClick={ () =>
      {
        setClicked(!clicked)
        handleClick(data)
      } }
    >
      <Image
        src={ `/icons/${ data.icon }` }
        width={ 40 }
        height={ 40 }
        alt='Services Icon'
      />
      <div className='flex flex-col justify-center items-start'>
        <h2 className={ `${ clicked ? 'text-white' : 'text-primary-300' } font-bold transition-all ease-in-out` }>{ data.name }</h2>
        <p className='text-sm font-semibold'>{ data.desc }</p>
      </div>
    </div>
  )
}

export default SchedulerServices