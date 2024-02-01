import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import HiddenPass from '../components/HiddenPass'

export default function Signup() {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
      <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
        <Heading label={"Sign Up"}/>
        <SubHeading label={"Enter your information to create an account"}/>
        <InputBox label={"First Name"} placeholder={"Abhay"}/>
        <InputBox label={"Last Name"} placeholder={"Raj"}/>
        <InputBox label={"Email"} placeholder={"abhay@gmail.com"}/>
        <HiddenPass label={"Password"} placeholder={"123456789"} />
        <div className="pt-4">
          <Button label={"Sign Up"} />
        </div>
        <BottomWarning label={"Already have an Account?"} to={"/signin"} buttonText={"Sign In"}/>
      </div>
    </div>
    </div>
  )
}
    