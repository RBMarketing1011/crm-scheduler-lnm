import SchedulerServiceQuestions from './ScheduleServiceQuestions'
import SchedulerBackScreenBtn from '../btns/SchedulerBackScreenBtn'
import SchedulerNextScreenBtn from '../btns/SchedulerNextScreenBtn'

const ServiceQuestionsContent = ({ data, handleClick, nextScreen, prevScreen }) =>
{
  return (
    <main className='w-full h-[100%] flex flex-col justify-between'>
      <div className='w-full h-[100%] flex flex-col gap-3'>
        <h1 className='text-xl font-bold text-primary-300'>{ data.question }</h1>

        {
          data.answers.map(answer => (
            <SchedulerServiceQuestions
              data={ answer }
              handleClick={ handleClick }
            />
          ))
        }
      </div>

      <div className="w-full flex justify-end gap-3 mt-3">

        <SchedulerBackScreenBtn
          nextScreen={ prevScreen }
        />

        <SchedulerNextScreenBtn
          nextScreen={ nextScreen }
        />

      </div>
    </main >
  )
}

export default ServiceQuestionsContent