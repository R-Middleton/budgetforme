import React from 'react'
import { NavBar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Wrapper, WrapperVariant } from './Wrapper'

interface layoutProps {
  variant?: WrapperVariant
}

export const Layout: React.FC<layoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <Wrapper variant={variant}>{children}</Wrapper>
      </div>
    </>
  )
}
