import React from 'react'

interface Props {
    children : React.ReactNode
}

const ResponsiveNavbar : React.FC<Props> = ( { children } ) => {
  return (
    <div className='w-full flex gap-10 p-8 items-center bg-background shadow-md justify-center'>
        {children}
    </div>
  )
}

export default ResponsiveNavbar
