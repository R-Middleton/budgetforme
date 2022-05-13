import React from 'react'

export type WrapperVariant = 'small' | 'regular'

interface WrapperProps {
  variant?: WrapperVariant
  children: React.ReactNode
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <div
      className={` mx-auto mt-8 ${
        variant === 'regular' ? 'max-w-4xl' : 'max-w-md'
      } w-full`}
    >
      {children}
    </div>
  )
}
