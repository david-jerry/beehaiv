import React from 'react'

/**
 * The ErrorMessage function is a React component that displays an error message with a red background
 * and border.
 * @param  - The `ErrorMessage` function is a React component that takes a single prop `message` of
 * type string. It renders a styled div element that displays the provided message in a red-colored box
 * with specific styling (rounded corners, background color, text color, padding, and border).
 * @returns A React functional component named ErrorMessage is being returned. It takes a prop named
 * message of type string. Inside the component, a div element is rendered with specific styling
 * classes for a red-colored error message box displaying the provided message.
 */
export default function ErrorMessage({message}:{message:string}) {
  return (
    <div className='text-center w-full rounded-lg bg-red-300 text-red-700 text-xs p-2 border border-red-700'>
      {message}
    </div>
  )
}
