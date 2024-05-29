//dependencies

//components
import SchedulerNextScreenBtn from '../btns/SchedulerNextScreenBtn'
import SchedulerServices from './SchedulerServices'

//images

//icons
import { FaArrowRight } from 'react-icons/fa'

const ChooseServicesContent = ({ data, handleClick, nextScreen }) =>
{
  const SelectyourService = [
    {
      name: 'Describe Your Issue',
      icon: 'car.svg'
    },
    {
      name: 'Select Specific Part',
      icon: 'car.svg'
    },
  ]
  // ======================= Info for select Your Own service

  let select = true

  return (
    <>
      <h2 className='text-xl text-primary-300 font-bold'>Popular Services At { data.shop.name }</h2>
      <div className='w-full flex flex-wrap justify-center items-center gap-5'>
        {
          data.shop.services.map(serv => (
            <SchedulerServices
              data={ serv }
              handleClick={ handleClick }
            />
          ))
        }
      </div>

      <h2 className='text-xl text-primary-300 font-bold mt-5'>Select Your Own Service</h2>
      <div className='w-full flex flex-wrap justify-center items-center gap-5'>
        {
          SelectyourService.map(serv => (
            <SchedulerServices
              data={ serv }
              handleClick={ handleClick }
            />
          ))
        }
      </div>
      <div className="w-full flex justify-end gap-3 mt-3">

        <SchedulerNextScreenBtn
          nextScreen={ nextScreen }
        />
      </div>
    </>
  )
}

export default ChooseServicesContent