import { SignUp } from '@clerk/nextjs'
import React from 'react'

const Signuppage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center '>
        <SignUp/>
    </main>
  )
}

export default Signuppage