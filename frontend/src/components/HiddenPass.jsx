import React from 'react'

export default function HiddenPass({label,placeholder}) {
  return (
    <div>
        <div className='text-sm font-medium text-left py-2'>
            {label}
        </div>
        <input type="password"  placeholder={placeholder} className='w-full px-2 py-1' />
    </div>
  )
}
