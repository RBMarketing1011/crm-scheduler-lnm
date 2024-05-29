//dependencies
import Image from 'next/image'
import Link from 'next/link'

//components
import SchedulerMainContent from '@components/scheduler/SchedulerMainContent'

//images
import bg from '@assets/schedulerAssets/scheduler-bg.jpg'
import logo from '@assets/schedulerAssets/lnm-logo-black.png'

//icons
import { IoClose } from "react-icons/io5"


import Services from '@models/services'
import connectDB from '@db/connectDB'

const Scheduler = async () =>
{
  return (
    <div className='w-[100vw] h-[100vh] bg-black/40 fixed top-0 left-0 flex justify-center items-center'>

      <div className="w-[100vw] h-[100vh] sm:w-[600px] sm:h-[750px] sm:rounded-xl bg-white shadow-[0_0_20px_#000000] flex flex-col overflow-hidden relative">

        <div className="w-full h-[75px] overflow-hidden relative">
          <Image
            src={ bg }
            alt='Scheduler Background Image'
            priority
          />

          <Link className='absolute top-[15px] right-[15px]' href='/'>
            <IoClose className='text-white' size={ 25 } />
          </Link>

          <h1 className='absolute top-[50%] left-[15px] translate-y-[-50%] text-white text-2xl font-bold'>Book Appointment</h1>
        </div>

        <div className="w-full h-[89%] sm:h-[100%] p-[15px] pb-0">

          <SchedulerMainContent />

        </div>

        <div className="w-full h-[30px] flex justify-start items-center gap-1 pl-[15px]">
          <p>Powered by</p>
          <Image
            className='w-[100px] h-auto'
            src={ logo }
            alt='Leads Near Me Logo'
          />
        </div>

      </div>

    </div>
  )
}

export default Scheduler