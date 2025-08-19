import React from 'react'

interface Props {
    children : React.ReactNode
}

const ResponsiveNavbar : React.FC<Props> = ( { children } ) => {
  return (
    <div className='w-full flex gap-7 p-5 items-center justify-center'>
        {children}
    </div>
  )
}

export default ResponsiveNavbar
