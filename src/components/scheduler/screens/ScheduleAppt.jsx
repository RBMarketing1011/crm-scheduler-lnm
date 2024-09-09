import SchedulerNextScreenBtn from '../btns/SchedulerNextScreenBtn'
import SchedulerBackScreenBtn from '../btns/SchedulerBackScreenBtn'
import DateTimePicker from '../datepicker/DateTimePicker'

const ScheduleAppt = ({ nextScreen, prevScreen, date, time }) =>
{
  return (
    <main className='w-full h-[100%] flex flex-col justify-between'>
      <div className='w-full flex flex-col gap-10'>

        <div className='w-full flex flex-col gap-5'>
          <h1 className='text-xl font-bold text-primary-300'>Pick your date and time.</h1>
          <DateTimePicker
            date={ date }
            time={ time }
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