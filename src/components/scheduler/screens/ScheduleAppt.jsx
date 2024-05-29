import SchedulerNextScreenBtn from '../btns/SchedulerNextScreenBtn'
import SchedulerBackScreenBtn from '../btns/SchedulerBackScreenBtn'

const ScheduleAppt = ({ nextScreen, prevScreen }) =>
{
  return (
    <main className='w-full h-[100%] flex flex-col justify-between'>
      <div className='w-full flex flex-col gap-10'>
        <div className='w-full'>
          <h1 className='text-xl font-bold text-primary-300'>Please enter your one time passcode below.</h1>
        </div>

        <div className='w-full flex flex-col gap-5'>
          <input
            className='w-full rounded-md pl-2 h-[40px]'
            type="date"
            placeholder='Token'
            min='1'
            max='5'
            step='1,2,3,4,5'
            required
          />
        </div>
      </div>

      <div className="w-full flex justify-end gap-3 mt-3">

        <SchedulerBackScreenBtn
          nextScreen={ prevScreen }
        />

        <SchedulerNextScreenBtn
          nextScreen={ nextScreen }
        />

      </div>
    </main>
  )
}

export default ScheduleAppt