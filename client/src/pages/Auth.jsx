import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import G from '../assets/G.png';
import authSignin from "../assets/auth-signin.svg";

function Signup() {
    const [form, setForm] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const navigate = useNavigate();

    const [signinFields, setSigninFields] = useState({
        email: "",
        password: "",
    });

    const [signupFields, setSignupFields] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const [otp, setOtp] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [canReset, setCanReset] = useState(false);
    const [resetFields, setResetFields] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [countdown, setCountdown] = useState(0);

    const handleSigninChange = (event) => {
        const { name, value } = event.target;
        setSigninFields(values => ({ ...values, [name]: value.trim() }));
    };

    const handleSignupChange = (event) => {
        const { name, value } = event.target;
        setSignupFields(values => ({ ...values, [name]: value.trim() }));
    };

    const handleResetChange = (event) => {
        const { name, value } = event.target;
        setResetFields(values => ({ ...values, [name]: value.trim() }));
    };

    const handleSignin = async (event) => {
        event.preventDefault();
        if (signinFields.email && signinFields.password) {
            axios.post('/api/auth/signin', signinFields)
                .then(response => {
                    if (response.status === 200) {
                        window.localStorage.setItem("isAuthenticated", true);
                        navigate('/dashboard');
                    }
                })
                .catch(error => {
                    toast.error("Something went wrong!!", { position: 'top-center' });
                });
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        axios.post('/api/auth/signup', signupFields)
            .then(response => {
                if (response.status === 200) {
                    window.localStorage.setItem("isAuthenticated", true);
                    navigate('/dashboard');
                }
            })
            .catch(err => {
                if (err.response.data.errors) {
                    err.response.data.errors.forEach((error) => {
                        toast.error(error.msg, { duration: 5000, position: 'bottom-right' });
                    });
                }
            });
    };

    const handleForgotPassword = () => {
        setForgotPassword(true);
    };

    const handleSendOtp = () => {
        if (!resetEmail) {
            toast.error("Empty Email Field!", { position: 'top-center' });
        }
        axios.post('/api/u/send-otp', { email: resetEmail })
            .then(response => {
                if (response.status === 200) {
                    toast.success("OTP sent to your email.", { position: 'top-center' });
                    setCountdown(30);
                    setCanReset(true)
                    const timer = setInterval(() => {
                        setCountdown(prev => {
                            if (prev <= 1) {
                                clearInterval(timer);
                                return 0;
                            }
                            return prev - 1;
                        });
                    }, 1000);
                }
            })
            .catch(error => {
                toast.error("Failed to send OTP.", { position: 'top-center' });
            });
    };

    const handleResetPassword = () => {
        if (resetFields.newPassword !== resetFields.confirmPassword) {
            toast.error("Passwords do not match!", { position: 'top-center' });
        } else if (resetFields.newPassword == '' || resetFields.confirmPassword == '') {
            return toast.error("Empty input fields!", { position: 'top-center' });
        } else {
            const Fields = {
                newPassword: resetFields.newPassword,
                otp
            }
            axios.post('/api/u/reset-password', Fields)
                .then(response => {
                    if (response.status === 200) {
                        toast.success("Password reset successfully.", { position: 'top-center' });
                        setResetFields({ newPassword: "", confirmPassword: "" });
                        setForgotPassword(false);
                        setForm(false);
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.errors) {
                        console.log('Validation errors:', error.response.data.errors);
                        error.response.data.errors.forEach((err) => toast.error(err.msg, { duration: 5000, position: 'top-center' }));
                    } else if (error.response.data) {
                        console.log('An error occurred:', error.message);
                        toast.error(error.response.data, { duration: 5000, position: 'top-center' });
                    } else if (error.response.data.msg) {
                        console.log('An error occurred:', error.message);
                        toast.error(error.response.data.msg, { duration: 5000, position: 'top-center' });
                    } else {
                        console.log('An error occurred:', error.message);
                        toast.error('An error occurred. Please try again.', { duration: 5000, position: 'top-center' });
                    }
                });
        }
    };

    const handlewithgoogle = () => {
        window.location.href = 'https://filestorage-xq97.onrender.com/api/auth/google';
    };

    return (
        <div className='max-w-screen flex flex-col sm:flex-row bg-[#7551be] h-screen'>
            <div className="max-w-screen sm:w-[50%] min-h-[30%] sm:h-screen flex items-center justify-center bg-indigo-900 ">
                <img src={authSignin} className='w-[60%]  m-2 sm:w-full lg:w-[90%]' alt="" />
            </div>

            <div className='max-w-screen sm:w-[50%] h-[65vh] sm:h-screen bg-[#7551be] flex justify-center items-center'>
                {!forgotPassword ? (
                    !form ? (
                        <div className="flex flex-col justify-center space-y-6 w-full mx-10 max-w-[21rem] sm:mb-12">
                            <div className="space-y-2">
                                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight w-full text-center text-indigo-50">Login</h2>
                            </div>

                            <form onSubmit={handleSignin} className="space-y-4">
                                <div className="space-y-2">
                                    <Input name="email" value={signinFields.email} onChange={handleSigninChange} placeholder="Enter your Email" required type="email" className="h-12 bg-slate-50 shadow-lg text-base" />
                                </div>
                                <div className="space-y-2">
                                    <div className="">
                                        <Input name="password" value={signinFields.password} onChange={handleSigninChange} placeholder="Enter your Password" required type="password" className="h-12 bg-slate-50 shadow-lg text-base" />
                                        <div className='flex items-center justify-between'>
                                            <Link onClick={() => setForm(true)} className="text-base font-bold hover:underline underline-offset-4 text-indigo-100 dark:text-gray-50 text-left">
                                                Create account?
                                            </Link>

                                            <Link onClick={handleForgotPassword} className="text-base font-bold hover:underline underline-offset-4 text-indigo-100 dark:text-gray-50 text-right ">
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full h-12 text-lg font-extrabold bg-indigo-500 text-indigo-50 hover:bg-indigo-400 shadow-xl" type="submit">
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
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center space-y-2 w-full mx-10 max-w-[21rem] sm:mb-12">
                            <div className="space-y-">
                                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight w-full text-center text-indigo-50 mb-7">Create Account</h1>
                            </div>

                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="space-y-2">
                                    <Input name="name" value={signupFields.name} onChange={handleSignupChange} placeholder="Enter your Name" required type="text" className="h-12 bg-slate-50 shadow-lg" />
                                </div>
                                <hr />
                                <div className="space-y-2">
                                    <Input name="email" value={signupFields.email} onChange={handleSignupChange} placeholder="Enter your Email" required type="email" className="h-12 bg-slate-50 shadow-lg" />
                                </div>
                                <div className="space-y-2">
                                    <Input name="password" value={signupFields.password} onChange={handleSignupChange} placeholder="Enter your Password" required type="password" className="h-12 bg-slate-50 shadow-lg" />
                                </div>
                                <div className="space-y-2">
                                    <Input name="confirm_password" value={signupFields.confirm_password} onChange={handleSignupChange} placeholder="Confirm Password" required type="password" className="h-12 bg-slate-50 shadow-lg" />
                                </div>
                                <Button className="w-full h-12 text-lg font-extrabold bg-indigo-500 text-indigo-50 hover:bg-indigo-400 shadow-xl" type="submit">
                                    Sign up
                                </Button>
                                <div className="text-base font-bold hover:underline underline-offset-4 text-indigo-100 dark:text-gray-50 text-center">
                                    <Link onClick={() => setForm(false)} className="text-base font-bold hover:underline underline-offset-4 text-indigo-100 dark:text-gray-50">
                                        Already have an account?
                                    </Link>
                                </div>
                            </form>
                        </div>
                    )
                ) : (
                    <div className="flex flex-col justify-center space-y-2 w-full mx-10 max-w-[21rem] sm:mb-12">
                        <div className="space-y-">
                            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight w-full text-center text-indigo-50 mb-7">Reset Password</h1>
                        </div>

                        {!canReset ? (
                            <div>
                                <Input name="resetEmail" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="Enter your Email" required type="email" className="h-12 bg-slate-50 shadow-lg mb-4" />
                                <Button className="w-full h-12 text-lg font-extrabold bg-indigo-500 text-indigo-50 hover:bg-indigo-400 shadow-xl" type="button" onClick={handleSendOtp} >
                                    {countdown > 0 ? `Resend OTP in ${countdown}s` : "Send OTP"}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <div className='mb-4'>
                                    <Input name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required type="text" className="h-12 bg-slate-50 shadow-lg mb-4" />
                                    <Button className="w-full h-12 text-lg font-extrabold bg-indigo-500 text-indigo-50 hover:bg-indigo-400 shadow-xl"
                                        type="button" onClick={handleSendOtp} disabled={countdown}>
                                        {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                                    </Button>
                                </div>
                                <div>
                                    <Input name="newPassword" value={resetFields.newPassword} onChange={handleResetChange} placeholder="New Password" required type="password" className="h-12 bg-slate-50 shadow-lg mb-4" />
                                    <Input name="confirmPassword" value={resetFields.confirmPassword} onChange={handleResetChange} placeholder="Confirm Password" required type="password" className="h-12 bg-slate-50 shadow-lg mb-4" />
                                    <Button className="w-full h-12 text-lg font-extrabold bg-indigo-500 text-indigo-50 hover:bg-indigo-400 shadow-xl" type="button" onClick={handleResetPassword}>
                                        Reset Password
                                    </Button>
                                </div>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;
