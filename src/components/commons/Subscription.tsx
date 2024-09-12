import React from 'react'
import GetStartedForm from './GetStartedForm'

export default function Subscription() {
  return (
    <section className='w-screen py-16 bg-gray-50 flex flex-col items-center'>
      <div className="container flex flex-col items-center space-y-4 justify-center">
        <strong className="flex font-bold text-4xl w-fit text-center">Apply in less than 10 minutes today</strong>
        <p className="flex w-fit">Join over 1,000+ businesses already using BeeHaiv</p>
        <GetStartedForm />
      </div>
    </section>
  )
}
