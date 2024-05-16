import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none',
}

const variantStyles = {
  solid: {
    slate:
      'bg-primary-300 text-white hover:bg-primary-500 active:bg-primary-500 focus-visible:outline-primary-300 transition-all',
  },
  outline: {
    slate:
      'ring-primary-300 text-primary-300 hover:text-white hover:bg-primary-300 hover:ring-primary-300 active:bg-primary-300 active:text-white focus-visible:outline-primary-300 focus-visible:ring-primary-300 transition-all'
  },
}

export function Button ({ className, ...props })
{
  props.variant ??= 'solid'
  props.color ??= 'slate'

  className = clsx(
    baseStyles[ props.variant ],
    props.variant === 'outline'
      ? variantStyles.outline[ props.color ]
      : props.variant === 'solid'
        ? variantStyles.solid[ props.color ]
        : undefined,
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={ className } { ...props } />
  ) : (
    <Link className={ className } { ...props } />
  )
}
