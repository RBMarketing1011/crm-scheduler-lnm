import Image from 'next/image'

import backgroundImage from '@images/background-auth.jpg'

export function SlimLayout ({ children })
{
  return (
    <div className="relative flex min-h-full shrink-0 justify-center md:px-12 lg:px-0">
      <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:px-10">
        <main className="mx-auto w-full sm:px-4 md:px-10">
          { children }
        </main>
      </div>
      <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={ backgroundImage }
          alt=""
          priority
        />
      </div>
    </div>
  )
}
