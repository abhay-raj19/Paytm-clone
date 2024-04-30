import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import HiddenPass from '../components/HiddenPass'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
      <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
        <Heading label={"Sign Up"}/>
        <SubHeading label={"Enter your information to create an account"}/>
        <InputBox onChange={(e) => {
          setFirstName(e.target.value)
        }} label={"First Name"} placeholder={"Abhay"}/>
        <InputBox onChange={(e) => {
          setLastName(e.target.value)
        }} label={"Last Name"} placeholder={"Raj"}/>
        <InputBox onChange={(e) =>{
          setUsername(e.target.value)
        }} label={"Username"} placeholder={"abhay@gmail.com"}/>
        <HiddenPass onChange={(e) =>{
          setPassword(e.target.value)
        }} label={"Password"} placeholder={"123456789"} />
        <div className="pt-4">
          <Button label={"Sign Up"} onClick={ async ()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
              username:username,
              firstName:firstName,
              lastName:lastName,
              password:password,
            })
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard");
          }}/>
        </div>
        <BottomWarning label={"Already have an Account?"} to={"/signin"} buttonText={"Sign In"}/>
      </div>
    </div>
    </div>
  )
}
    