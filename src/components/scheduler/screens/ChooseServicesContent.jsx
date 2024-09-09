//dependencies
import { v4 } from 'uuid'

//components
import SchedulerNextScreenBtn from '../btns/SchedulerNextScreenBtn'
import SchedulerServices from './SchedulerServices'

//images

//icons

const ChooseServicesContent = ({ data, handleClick, nextScreen, selected }) =>
{
  const popularServices = [
    {
      name: 'Oil Change',
      desc: 'Oil change, filters, lube',
      icon: 'car.svg',
      moreInfo: {
        question: 'This is a question',
        answers: [
          'This is an answer',
          'So is this',
          'And this too',
          'Also this is a answer'
        ]
      }
    },
    {
      name: 'Vehicle Inspection',
      desc: 'Emissions, safety',
      icon: 'car.svg',
      moreInfo: {
        question: 'This is a question',
        answers: [
          'This is an answer',
          'So is this',
          'And this too',
          'Also this is a answer'
        ]
      }
    },
    {
      name: 'Brakes',
      desc: 'Issues, pads, rotors, inspection',
      icon: 'car.svg',
      moreInfo: {
        question: 'This is a question',
        answers: [
          'This is an answer',
          'So is this',
          'And this too',
          'Also this is a answer'
        ]
      }
    },
    {
      name: 'Engine & Transmission',
      desc: 'Issue diagnosis, fluids, drivetrain',
      icon: 'car.svg',
      moreInfo: {
        question: 'This is a question',
        answers: [
          'This is an answer',
          'So is this',
          'And this too',
          'Also this is a answer'
        ]
      }
    },
    {
      name: 'Heat or A/C',
      desc: 'No heat, no AC, intermittent issues',
      icon: 'car.svg',
      moreInfo: {
        question: 'This is a question',
        answers: [
          'This is an answer',
          'So is this',
          'And this too',
          'Also this is a answer'
        ]
      }
    },
    {
      name: 'Scheduled Maintenance',
      desc: 'Services recommended at specific mileage',
      icon: 'car.svg',
      moreInfo: {
        question: 'This is a question',
        answers: [
          'This is an answer',
          'So is this',
          'And this too',
          'Also this is a answer'
        ]
      }
    },
    {
      name: 'Tires',
      desc: 'Replacement, rotations, alignments',
      icon: 'car.svg',
      moreInfo: {
        question: 'This is a question',
        answers: [
          'This is an answer',
          'So is this',
          'And this too',
          'Also this is a answer'
        ]
      }
    },
    {
      name: 'Battery',
      desc: 'Battery replacement, testing, starter',
      icon: 'car.svg',
      moreInfo: {
        question: 'This is a question',
        answers: [
          'This is an answer',
          'So is this',
          'And this too',
          'Also this is a answer'
        ]
      }
    },
  ]

  const SelectyourService = [
    {
      name: 'Describe Your Issue',
      icon: 'car.svg',
      moreInfo: {
        question: 'This is a question',
        answers: [
          'This is an answer',
          'So is this',
          'And this too',
          'Also this is a answer'
        ]
      }
    },
    {
      name: 'Select Specific Part',
      icon: 'car.svg',
      moreInfo: {
        question: 'This is a question',
        answers: [
          'This is an answer',
          'So is this',
          'And this too',
          'Also this is a answer'
        ]
      }
    },
  ]
  // ======================= Info for select Your Own service

  return (
    data &&

    <>
      <h2 className='text-xl text-primary-300 font-bold'>Popular Services At { data.shop.name }</h2>
      <div className='w-full flex flex-wrap justify-center items-center gap-5'>
        {
          popularServices.map(serv => (
            <SchedulerServices
              key={ v4() }
              data={ serv }
              selected={ selected }
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
              key={ v4() }
              data={ serv }
              selected={ selected }
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