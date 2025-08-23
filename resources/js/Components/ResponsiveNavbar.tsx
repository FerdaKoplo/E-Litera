import React from 'react'

interface Props {
    children : React.ReactNode
}

const ResponsiveNavbar : React.FC<Props> = ( { children } ) => {
  return (
    <div className='w-full flex gap-10 p-8 items-center sticky top-0 z-50 bg-gradient-to-b from-violet-50 to-white  shadow justify-center'>
        {children}
    </div>
  )
}

export default ResponsiveNavbar
