import React from 'react'

export default function ErrorMessage({message}:{message:string}) {
  return (
    <div className='text-center w-full rounded-lg bg-red-300 text-red-700 text-xs p-2 border border-red-700'>
      {message}
    </div>
  )
}
