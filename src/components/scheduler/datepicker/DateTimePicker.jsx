import React from "react"
import { DatePicker, TimeInput } from "@nextui-org/react"
import { today, isWeekend, getLocalTimeZone, Time, parseDate } from "@internationalized/date"
import { useLocale, useDateFormatter } from "@react-aria/i18n"

export default function DateTimePicker ({ date, time })
{

  let formatter = useDateFormatter({ dateStyle: "full" })

  let now = today(getLocalTimeZone())

  let { locale } = useLocale()

  let isDateUnavailable = (date) =>
    isWeekend(date, locale)

  return (
    <div className="light w-full max-w-xl flex flex-col gap-4">

      <DatePicker
        className="max-w-full text-primary-300"
        granularity='day'
        label="Appointment Date"
        value={ date.state }
        onChange={ date.setState }
        minValue={ now }
        maxValue={ now.add({ days: 21 }) }
        isDateUnavailable={ isDateUnavailable }
        color='secondary'
      />

      <TimeInput
        label="Appointment Time"
        defaultValue={ new Time(8) }
        minValue={ new Time(8) }
        maxValue={ new Time(19) }
        value={ time.state }
        onChange={ time.setState }
        color='secondary'
      />

      <div>
        <h4 className='text-md font-semibold'>Appointment:</h4>
        <p className="text-default-500 text-sm">
          Date: { date.state ? formatter.format(date.state.toDate()) : "--" }
        </p>
        <p className="text-default-500 text-sm">
          Time: { time.state ? new Date().setTime(time.state) : "--" }
        </p>
      </div>

    </div>
  )
}