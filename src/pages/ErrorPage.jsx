import React from 'react'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div className='grid place-content-center gap-4 h-screen place-items-center'>
    <h1 className='text-4xl font-semibold tracking-tight text-gray-900'>Oops...</h1>
    <p className='text-xl text-gray-700'>No Page Found</p>
    <button className='mt-5'>
      <Link className='bg-blue-700 px-5 py-5 rounded-full mt-5 text-white' to='/'>Go Back</Link>
    </button>
  </div>
  )
}

export default ErrorPage