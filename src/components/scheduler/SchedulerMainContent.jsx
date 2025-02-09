'use client'

//dependencies
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

//components
import ChooseServicesContent from './screens/ChooseServicesContent'
import Loader from '../../components/atom/Loader'
import { Notifi, notifi } from '@lib/utils/Notifications/Notify'

//images

//icons
import ServiceQuestionsContent from './screens/ServiceQuestionsContent'
import { v4 } from 'uuid'
import AddCommentsPhotos from './screens/AddCommentsPhotos'
import EmailAuthScreen from './screens/EmailAuthScreen'
import VerifyEmailToken from './screens/VerifyEmailToken'
import VehicleInfo from './screens/VehicleInfo'
import ScheduleAppt from './screens/ScheduleAppt'


import { now, getLocalTimeZone } from "@internationalized/date"


const SchedulerMainContent = () =>
{
  // =========================Notifi State 
  const [ notify, setNotify ] = useState({
    type: '',
    text: '',
    show: false
  })

  // ======================== Get Account & Shop info from search params and set State
  const searchParams = useSearchParams()

  const accountId = searchParams.get('accountId')
  const locationId = searchParams.get('locationId')

  const [ data, setData ] = useState('')

  // ======================= State To determine what screen is in the Content Area
  const [ contentScreen, setContentScreen ] = useState('Choose Services')
  // ======================= State To determine what screen is in the Content Area

  const [ errorMsg, setErrorMsg ] = useState(null)

  useEffect(() =>
  {
    const getAccount = async () =>
    {
      try
      {
        const res = await fetch(`${ process.env.NEXT_PUBLIC_API_DOMAIN }/scheduler`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accountId, locationId })
        })

        const data = await res.json()

        if (data.success)
        {
          setData(data.success)
        } else if (data.error)
        {
          setContentScreen('Error')
          setErrorMsg(data.error)
        }
      } catch (error)
      {
        console.log(error)
      }
    }

    getAccount()

  }, [ accountId, locationId ])
  // ======================== Get Account & Shop info from search params and set State

  // ======================== Handle All actions on click to setState with services
  const [ servicesSelected, setServicesSelected ] = useState([])

  const handleClick = (service) =>
  {
    setServicesSelected(prev => ([ ...prev, service ]))

    servicesSelected.map(el =>
    {
      if (el.name === service.name)
      {
        setServicesSelected(prev => prev.filter(el => el.name !== service.name))
      }
    })
  }

  // ======================== Handle All actions on click to setState with services

  // ======================== Handle All actions on click to setState with Qs and As
  const [ answersSelected, setAnswersSelected ] = useState([])

  const questionsHandleClick = (service) =>
  {
    answersSelected.includes(service) ?
      setAnswersSelected(prev => prev.filter(prev => prev !== service))
      :
      setAnswersSelected(prev => [ ...prev, service ])
  }
  // ======================== Handle All actions on click to setState with Qs and As

  // ======================== Handle showing Questions at Index of servicesSelected
  const [ showQuestion, setShowQuestion ] = useState(0)
  // ======================== Handle showing Questions at Index of servicesSelected

  //========================= State to set customer to verify email token with
  const [ customerId, setCustomerId ] = useState('')
  //========================= State to set customer to verify email token with

  // ================================= state to log vehicle year, make, model
  const [ year, setYear ] = useState('')
  const [ make, setMake ] = useState('')
  const [ model, setModel ] = useState('')
  // ================================= state to log vehicle year, make, model
  // ===================================== Appointment date and time state
  const [ apptDate, setApptDate ] = useState(now())
  const [ apptTime, setApptTime ] = useState(null)

  // apptDate && console.log(new Date(apptDate.month + '-' + apptDate.day + '-' + apptDate.year))
  // ===================================== End Appointment date and time state

  return (
    <main className='w-full h-[100%] p-2 bg-gray-100 rounded-md flex flex-col justify-between gap-3 overflow-y-auto'>
      <Notifi data={ { state: notify, setState: setNotify } } />



      {
        data ?
          contentScreen === 'Choose Services' ?

            <ChooseServicesContent
              data={ data }
              handleClick={ handleClick }
              selected={ servicesSelected }
              nextScreen={ () =>
              {
                servicesSelected.length === 0 ?
                  notifi.error('Please Select A Service', setNotify)
                  :
                  setContentScreen('Service Questions')
              } }
            />

            :

            contentScreen === 'Service Questions' ?


              <ServiceQuestionsContent
                key={ v4() }
                data={ servicesSelected[ showQuestion ].moreInfo }
                handleClick={ questionsHandleClick }
                selected={ answersSelected }
                nextScreen={ () =>
                {
                  answersSelected.length === 0 ?
                    notifi.error('Please Select An Answer', setNotify)
                    :
                    showQuestion < servicesSelected.length - 1 ?
                      setShowQuestion(prev => prev + 1)
                      :
                      setContentScreen('Additional Comments')
                } }
                prevScreen={ () => setContentScreen('Choose Services') }
              />

              :

              contentScreen === 'Additional Comments' ?

                <AddCommentsPhotos
                  nextScreen={ () => setContentScreen('Email Auth Screen') }
                  prevScreen={ () => setContentScreen('Service Questions') }
                />

                :

                contentScreen === 'Email Auth Screen' ?

                  <EmailAuthScreen
                    shop={ data.location }
                    customerChange={ setCustomerId }
                    nextScreen={ () => setContentScreen('Verify Email Token') }
                    prevScreen={ () => setContentScreen('Additional Comments') }
                  />

                  :

                  contentScreen === 'Verify Email Token' ?

                    <VerifyEmailToken
                      customerId={ customerId }
                      nextScreen={ () => setContentScreen('Vehicle Info') }
                      prevScreen={ () => setContentScreen('Email Auth Screen') }
                    />

                    :

                    contentScreen === 'Vehicle Info' ?

                      <VehicleInfo
                        year={ { value: year, onChange: (e) => setYear(e.target.value) } }
                        make={ { value: make, onChange: (e) => setMake(e.target.value) } }
                        model={ { value: model, onChange: (e) => setModel(e.target.value) } }
                        nextScreen={ () =>
                        {
                          !year || !make || !model ?
                            notifi.error('Please Select A Service', setNotify)
                            :
                            setContentScreen('Schedule Appt')
                        } }
                        prevScreen={ () => setContentScreen('Verify Email Token') }
                      />

                      :

                      contentScreen === 'Schedule Appt' ?

                        <ScheduleAppt
                          date={ { state: apptDate, setState: setApptDate } }
                          time={ { state: apptDate, setState: setApptDate } }
                          nextScreen={ () => setContentScreen('Next') }
                          prevScreen={ () => setContentScreen('Vehicle Info') }
                        />

                        :

                        contentScreen === 'Next' &&

                        <h1>Next Screen</h1>

          :

          errorMsg ?

            <div className='w-full h-full flex flex-col justify-center items-center text-center gap-3 divide-y-1 divide-primary-300/50'>
              <h2>{ errorMsg }</h2>
              <h2 className='pt-3'>Please contact your location admin for details</h2>
            </div>

            :

            <Loader />
      }
    </main>
  )
}

export default SchedulerMainContent