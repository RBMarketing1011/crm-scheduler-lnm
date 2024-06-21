import React from "react"
import { DatePicker } from "@nextui-org/react"
import { today, isWeekend, getLocalTimeZone } from "@internationalized/date"
import { useLocale } from "@react-aria/i18n"

export default function DateTimePicker ({ dateTime })
{

  let now = today(getLocalTimeZone())

  let disabledRanges = [
    [ now, now.add({ days: 14 }) ],
    // [ now.add({ days: 14 }), now.add({ days: 16 }) ],
    // [ now.add({ days: 23 }), now.add({ days: 24 }) ],
  ]

  let { locale } = useLocale()

  let isDateUnavailable = (date) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) => date.compare(interval[ 0 ]) >= 14
        && date.compare(interval[ 0 ]) <= 0,
    )


  return (
    <div className="light w-full max-w-xl flex flex-row gap-4">

      <DatePicker
        className="max-w-full"
        classNames={ {
          svg: 'text-primary-300'
        } }
        granularity="second"
        label="Date and time"
        value={ dateTime.state }
        onChange={ dateTime.setState }
        isDateUnavailable={ isDateUnavailable }
      />

    </div>
  )
}