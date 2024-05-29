import { FaArrowLeft } from 'react-icons/fa'

const SchedulerBackScreenBtn = ({ nextScreen }) =>
{
  return (
    <button className='bg-primary-300 text-white hover:bg-primary-500 px-10 py-2 rounded-md shadow-[0_0_5px_#000000] flex justify-center items-center gap-2 transition-all ease-in-out'
      onClick={ nextScreen }
    >
      <FaArrowLeft />
      BACK
    </button>
  )
}

export default SchedulerBackScreenBtn