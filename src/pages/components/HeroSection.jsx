import React from 'react'

export default function HeroSection() {
  return (
    <div className='bg-linear-to-r from-gray-700 via-gray-900 to-black h-50 flex justify-center items-center'>
      <div className='space-y-2'>
        <h1 className='text-violet text-3xl text-center sm:text-left '>Welcome To My Library</h1>
        <span className='text-gray-50 items-center -ml-2'>The place where u can store and manage books</span>
      </div>
    </div>
  )
}
