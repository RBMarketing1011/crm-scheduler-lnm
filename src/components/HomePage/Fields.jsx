import { useId } from 'react'
import clsx from 'clsx'

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-primary-300 sm:text-sm'

function Label ({ id, children })
{
  return (
    <label
      htmlFor={ id }
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      { children }
    </label>
  )
}

export function TextField ({ label, type, className, value, onChange, ...props })
{
  let id = useId()

  return (
    <div className={ className }>
      { label && <Label id={ id }>{ label }</Label> }
      <input id={ id } type={ type } { ...props } className={ formClasses } value={ value } onChange={ onChange } />
    </div>
  )
}

export function SelectField ({ label, className, options, onChange, ...props })
{
  let id = useId()

  return (
    <div className={ className }>
      { label && <Label id={ id }>{ label }</Label> }
      <select
        id={ id }
        { ...props }
        className={ clsx(formClasses, 'pr-8') }
        onChange={ onChange }
      >
        <option value="blank"></option>
        {
          options.map((opt, optIdx) => (
            <option key={ optIdx } value={ opt }>{ opt }</option>
          ))
        }
      </select>
    </div>
  )
}
