import SchedulerBackScreenBtn from '../btns/SchedulerBackScreenBtn'
import SchedulerNextScreenBtn from '../btns/SchedulerNextScreenBtn'

const AddCommentsPhotos = ({ prevScreen, nextScreen }) =>
{
  return (
    <main className='w-full h-[100%] flex flex-col justify-between'>
      <div className='w-full h-[100%] flex flex-col justify-start gap-3'>
        <h1 className='text-xl font-bold text-primary-300'>Anything else you would like your technician to know?</h1>
        <form action="" method='POST' encType='multipart/form-data'>
          <textarea className='w-full p-1 rounded-md focus:ring-primary-300 focus:border-none' rows='5' placeholder='Add Comment Here...' />
          <input className='mt-3 hover:cursor-pointer' type="file" multiple />
        </form>
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

export default AddCommentsPhotos