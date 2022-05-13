import React from 'react'
import { NavBar } from './Navbar'
import { Wrapper, WrapperVariant } from './Wrapper'

interface layoutProps {
  variant?: WrapperVariant
}

export const Layout: React.FC<layoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  )
}
