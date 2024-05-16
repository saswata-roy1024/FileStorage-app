import React from 'react'
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import G from '../assets/G.png'
import authSignin from "../assets/auth-signin.svg"



function Signup() {
    const [form, setForm] = useState(false)

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        repeat_password: "",
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = (event.target.value).trim();
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSignin = async (event) => {
        event.preventDefault();

    }


    const handleSignup = async (event) => {
        event.preventDefault();


    }

    const handlewithgoogle = async () => {

    }


    return (<>

        <div className='max-w-screen flex flex-col sm:flex-row bg-[#7551be] h-screen'>
            <div className="max-w-screen sm:w-[50%] min-h-[30%] sm:h-screen flex items-center justify-center bg-indigo-900 ">
                <img src={authSignin} className='w-[60%]  m-2 sm:w-full lg:w-[90%]' alt="" />
            </div>

            <div className='max-w-screen sm:w-[50%] h-[65vh] sm:h-screen bg-[#7551be] flex justify-center items-center'>

                {!form ? (<div className="flex flex-col justify-center space-y-6 w-full mx-10 max-w-[21rem] sm:mb-12">

                    <div className="space-y-2">
                        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight w-full text-center text-indigo-950">Login</h2>
                    </div>

                    <form onSubmit={handleSignin} className="space-y-4">
                        <div className="space-y-2">
                            <Input name="email" value={inputs.email} onChange={handleChange} placeholder="Enter your Email" required type="email" className="h-12 bg-slate-50 shadow-lg text-base" />
                        </div>
                        <div className="space-y-2">
                            <div className="">
                                <Input name="password" value={inputs.password} onChange={handleChange} placeholder="Enter your Password" required type="password" className="h-12 bg-slate-50 shadow-lg text-base" />
                                <div className='flex items-center justify-between'>
                                    <Link onClick={() => setForm(true)}
                                        className="text-sm font-medium hover:underline underline-offset-4 text-gray-900 dark:text-gray-50 text-left">
                                        Create account?
                                    </Link>

                                    <Link
                                        className="text-sm font-medium hover:underline underline-offset-4 text-gray-900 dark:text-gray-50 text-right ">
                                        Forgot password?
                                    </Link>
                                </div>

                            </div>
                        </div>
                        <Button className="w-full h-12 text-lg font-bold bg-indigo-950 hover:bg-indigo-900 shadow-lg" type="submit">
                            Sign in
                        </Button>
                    </form>
                    <hr />

                    <div>
                        <Button type={"button"} onClick={handlewithgoogle} className="w-full text-sm text-slate-800 border bg-slate-100 hover:bg-white gap-2 h-12 shadow-lg" >
                            <img src={G} alt="G" width={"26"} />
                            Continue with Google
                        </Button>
                    </div>


                </div>) : (<div className="flex flex-col justify-center space-y-2 w-full mx-10 max-w-[21rem] sm:mb-12">

                    <div className="space-y-">
                        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight w-full text-center text-indigo-950 mb-7">Create Account</h1>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Input name="name" value={inputs.name} onChange={handleChange} placeholder="Enter your fullname" required type="text" className="h-12 bg-slate-50 shadow-lg" />
                        </div>
                        <hr />
                        <div className="space-y-2">
                            <Input name="email" value={inputs.email} onChange={handleChange} placeholder="Enter your Email" required type="email" className="h-12 bg-slate-50 shadow-lg" />
                        </div>

                        <div className="space-y-2">
                            <Input name="password" value={inputs.password} onChange={handleChange} placeholder="Enter password" required type="password" className="h-12 bg-slate-50 shadow-lg" />
                        </div>

                        <div className="space-y-2">
                            <div className="">
                                <Input name="repeat_password" value={inputs.repeat_password} onChange={handleChange} placeholder="Confirm password" required type="password" className="h-12 bg-slate-50 shadow-lg" />
                            </div>
                        </div>
                        <Button className="w-full h-12 text-lg font-bold bg-indigo-950 hover:bg-indigo-900 shadow-lg" type="submit">
                            Sign Up
                        </Button>
                    </form>
                    <p onClick={() => setForm(false)}
                        className="text-base font-medium underline underline-offset-4 text-gray-300 hover:text-gray-50 text-left cursor-pointer px-2"
                        href="#">
                        Already have an Account?
                    </p>



                </div>)}

            </div>

        </div>
    </>)
}

export default Signup