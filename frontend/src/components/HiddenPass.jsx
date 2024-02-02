import React from 'react'

export default function HiddenPass({label,placeholder,onChange}) {
  return (
    <div>
        <div className='text-sm font-medium text-left py-2'>
            {label}
        </div>
        <input onChange={onChange} type="password"  placeholder={placeholder} className='w-full px-2 py-1' />
    </div>
  )
}
