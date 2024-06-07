import Image from 'next/image'
import SchedulerBackScreenBtn from '../btns/SchedulerBackScreenBtn'
import SchedulerNextScreenBtn from '../btns/SchedulerNextScreenBtn'
import car from '@assets/schedulerAssets/car-outline.png'
import CarMakes from '../vehicle info components/CarMakes'
import CarYear from '../vehicle info components/CarYear'
import
{
  Blank,
  Acura,
  AlfaRomeo,
  Audi,
  Bmw,
  Buick,
  Cadillac,
  Chevy,
  Chrysler,
  Dodge,
  Fiat,
  Ford,
  Gmc,
  Honda,
  Hyundai,
  Infiniti,
  Jaguar,
  Jeep,
  Kia,
  LandRover,
  Lexus,
  Lincoln,
  Mazda,
  Mercedes,
  Mini,
  Mitsubishi,
  Nissan,
  Porsche,
  Subaru,
  Tesla,
  Toyota,
  Volkswagen,
  Volvo
} from '@components/scheduler/vehicle info components/CarModels'

const VehicleInfo = ({ nextScreen, prevScreen, year, make, model }) =>
{

  return (
    <main className='w-full h-[100%] flex flex-col justify-between'>
      <div className='w-full flex flex-col gap-10'>
        <div className='w-full'>
          <h1 className='text-xl font-bold text-primary-300'>Enter Your Vehicle Information.</h1>
        </div>

        <div className='w-full flex flex-col gap-5'>
          <div className='w-full p-10'>
            <Image
              src={ car }
              width={ 0 }
              height={ 0 }
              alt='Outline of a car'
              prioritysizes='100vw'
            />
          </div>

          <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-5'>
            <CarYear
              onChange={ year.onChange }
            />

            <CarMakes
              onChange={ make.onChange }
            />

            {
              make.value === '' ?

                <Blank />

                :

                make.value === 'Acura' ?

                  <Acura
                    onChange={ model.onChange }
                  />

                  :

                  make.value === 'Alfa Romeo' ?

                    <AlfaRomeo
                      onChange={ model.onChange }
                    />

                    :

                    make.value === 'Audi' ?

                      <Audi
                        onChange={ model.onChange }
                      />

                      :

                      make.value === 'BMW' ?

                        <Bmw
                          onChange={ model.onChange }
                        />

                        :

                        make.value === 'Buick' ?

                          <Buick
                            onChange={ model.onChange }
                          />

                          :

                          make.value === 'Cadillac' ?

                            <Cadillac
                              onChange={ model.onChange }
                            />

                            :

                            make.value === 'Chevrolet' ?

                              <Chevy
                                onChange={ model.onChange }
                              />

                              :

                              make.value === 'Chrysler' ?

                                <Chrysler
                                  onChange={ model.onChange }
                                />

                                :

                                make.value === 'Dodge' ?

                                  <Dodge
                                    onChange={ model.onChange }
                                  />

                                  :

                                  make.value === 'Fiat' ?

                                    <Fiat
                                      onChange={ model.onChange }
                                    />

                                    :

                                    make.value === 'Ford' ?

                                      <Ford
                                        onChange={ model.onChange }
                                      />

                                      :

                                      make.value === 'GMC' ?

                                        <Gmc
                                          onChange={ model.onChange }
                                        />

                                        :

                                        make.value === 'Honda' ?

                                          <Honda
                                            onChange={ model.onChange }
                                          />

                                          :

                                          make.value === 'Hyundai' ?

                                            <Hyundai
                                              onChange={ model.onChange }
                                            />

                                            :

                                            make.value === 'Infiniti' ?

                                              <Infiniti
                                                onChange={ model.onChange }
                                              />

                                              :

                                              make.value === 'Jaguar' ?

                                                <Jaguar
                                                  onChange={ model.onChange }
                                                />

                                                :

                                                make.value === 'Jeep' ?

                                                  <Jeep
                                                    onChange={ model.onChange }
                                                  />

                                                  :

                                                  make.value === 'Kia' ?

                                                    <Kia
                                                      onChange={ model.onChange }
                                                    />

                                                    :

                                                    make.value === 'Land Rover' ?

                                                      <LandRover
                                                        onChange={ model.onChange }
                                                      />

                                                      :

                                                      make.value === 'Lexus' ?

                                                        <Lexus
                                                          onChange={ model.onChange }
                                                        />

                                                        :

                                                        make.value === 'Lincoln' ?

                                                          <Lincoln
                                                            onChange={ model.onChange }
                                                          />

                                                          :

                                                          make.value === 'Mazda' ?

                                                            <Mazda
                                                              onChange={ model.onChange }
                                                            />

                                                            :

                                                            make.value === 'Mercedes-Benz' ?

                                                              <Mercedes
                                                                onChange={ model.onChange }
                                                              />

                                                              :

                                                              make.value === 'Mini' ?

                                                                <Mini
                                                                  onChange={ model.onChange }
                                                                />

                                                                :

                                                                make.value === 'Mitsubishi' ?

                                                                  <Mitsubishi
                                                                    onChange={ model.onChange }
                                                                  />

                                                                  :

                                                                  make.value === 'Nissan' ?

                                                                    <Nissan
                                                                      onChange={ model.onChange }
                                                                    />

                                                                    :

                                                                    make.value === 'Porsche' ?

                                                                      <Porsche
                                                                        onChange={ model.onChange }
                                                                      />

                                                                      :

                                                                      make.value === 'Subaru' ?

                                                                        <Subaru
                                                                          onChange={ model.onChange }
                                                                        />

                                                                        :

                                                                        make.value === 'Tesla' ?

                                                                          <Tesla
                                                                            onChange={ model.onChange }
                                                                          />

                                                                          :

                                                                          make.value === 'Toyota' ?

                                                                            <Toyota
                                                                              onChange={ model.onChange }
                                                                            />

                                                                            :

                                                                            make.value === 'Volkswagen' ?

                                                                              <Volkswagen
                                                                                onChange={ model.onChange }
                                                                              />

                                                                              :

                                                                              make.value === 'Volvo' &&

                                                                              <Volvo
                                                                                onChange={ model.onChange }
                                                                              />

            }

          </div>
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

export default VehicleInfo