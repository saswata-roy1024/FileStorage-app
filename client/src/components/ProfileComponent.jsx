import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, updateUser } from '@/Redux/Slices/userSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound, MailCheck, KeyRound, CheckCheck } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from "@/components/ui/sheet";

export function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [otp, setOtp] = useState("");
    const [option, setOptions] = useState('default');
    const [countdown, setCountdown] = useState(0);
    const [canResend, setCanResend] = useState(false);
    const [initialSend, setInitialSend] = useState(true);
    const [userFields, setUserFields] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [passwordFields, setPasswordFields] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        setUserFields({
            name: user?.name || '',
            email: user?.email || '',
        })
    }, [user]);

    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setUserFields((values) => ({ ...values, [name]: value.trim() }));
    }

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPasswordFields((values) => ({ ...values, [name]: value.trim() }));
    }

    const handleSaveChanges = () => {
        dispatch(updateUser(userFields));
    };

    const handleResendClick = () => {
        setInitialSend(false);
        setCountdown(10);
        setCanResend(false);
        reSendOtp();
    };

    const handleOtpChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*\.?\d*$/.test(inputValue)) {
            setOtp(inputValue);
        }
    };

    const reSendOtp = () => {
        axios.get('/api/u/verify')
            .then(response => {
                if (response.status === 200) {
                    toast.success("Email sent to: " + user.email);
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Some error occured can\'t send the Email!", { position: 'top-center' });
            });
    };

    const handleOtp = (event) => {
        event.preventDefault();
        axios.post('/api/u/verify', { otp })
            .then(response => {
                if (response.status === 200) {
                    dispatch(fetchUser());
                    toast.success("Account verified successfully", { position: 'top-center' });
                }
            })
            .catch(error => handleError(error));
    };

    const ChangePassword = () => {

        if (passwordFields.newPassword !== passwordFields.confirmPassword) {
            return toast.error("Passwords do not match!", { position: 'top-center' });
        } else if (!passwordFields.newPassword || !passwordFields.confirmPassword) {
            return toast.error("Empty input fields!", { position: 'top-center' });

        }

        const Fields = {
            newPassword: passwordFields.newPassword,
            oldPassword: passwordFields.oldPassword,
        }

        axios.post('/api/u/change-password', Fields)
            .then(response => {
                if (response.status === 200) {
                    toast.success("Password changed successfully", { position: 'top-center' });
                    setPasswordFields({ oldPassword: '', newPassword: '', confirmPassword: '' });
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    console.log('Validation errors:', error.response.data.errors);
                    error.response.data.errors.forEach((err) => toast.error(err.msg, { duration: 5000, position: 'top-center' }));
                } else {
                    toast.error(error.response.data, { duration: 5000, position: 'top-center' });
                }
            });
    };

    const ResetPassword = () => {
        if (passwordFields.newPassword !== passwordFields.confirmPassword) {
            return toast.error("Passwords do not match!", { position: 'top-center' });
        } else if (passwordFields.newPassword == '' || passwordFields.confirmPassword == '') {
            return toast.error("Empty input fields!", { position: 'top-center' });
        }

        const Fields = {
            newPassword: passwordFields.newPassword,
            otp
        }
        
        axios.post('/api/u/reset-password', Fields)
            .then(response => {
                if (response.status === 200) {
                    toast.success("Password reset successfully", { position: 'top-center' });
                    setPasswordFields({ oldPassword: '', newPassword: '', confirmPassword: '' });
                    setOtp('');
                }
            })
            .catch(error => handleError(error));
    };

    const handleError = (error) => {
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
    };


    const renderContent = {
        default: (
            <SheetContent>
                <SheetHeader className='px-4 mb-10'>
                    <div className='flex flex-col gap-5 items-center mb-3'>
                        <Avatar className='w-24 h-24'>
                            <AvatarImage src={user?.profilePic} className='select-none cursor-pointer' />
                            <AvatarFallback>user</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col gap-2 bg-slate-200 py-2 px-5 rounded-sm bg-opacity-70 w-full text'>
                            <span className='overflow-hidden'>{user?.name}</span>
                            <span className='overflow-hidden'>{user?.email}</span>
                        </div>
                    </div>
                    <hr />
                </SheetHeader>
                <div className='flex flex-col gap-3 text-black dark:text-slate-50 w-full items-start'>
                    <Button onClick={() => setOptions('update')} className="space-x-2 w-full h-11 outline" variant="ghost">
                        <CircleUserRound />
                        <span className='text-lg mb-1'>Update Profile</span>
                    </Button>
                    <Button onClick={() => setOptions('verify')} className="space-x-2 w-full h-11 outline" variant="ghost">
                        <MailCheck />
                        <span className='text-lg'>Verify Email</span>
                    </Button>
                    <Button onClick={() => setOptions('modify')} className="space-x-2 w-full h-11 outline" variant="ghost">
                        <KeyRound />
                        <span className='text-lg'>modify Password</span>
                    </Button>
                </div>
                <SheetFooter>
                    <Button onClick={() => { }} className='w-full absolute bottom-4 right-0 text-black dark:text-slate-50 text-base rounded-none' variant="ghost">
                        <span className='border-y-2 w-full py-2'>Send Feedback</span>
                    </Button>
                </SheetFooter>
            </SheetContent>
        ),
        update: (
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">Name</label>
                        <Input name="name" value={userFields.name} onChange={handleUserChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right">Email</label>
                        <Input name="email" value={userFields.email} onChange={handleUserChange} className="col-span-3" />
                    </div>
                </div>
                <SheetFooter>
                    <Button onClick={handleSaveChanges} type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        ),
        verify: !user?.verified ? (
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Verify Email</SheetTitle>
                    <SheetDescription>
                        Follow the instructions sent to your email to verify your account.
                    </SheetDescription>
                </SheetHeader>
                <div className='my-8'>
                    <input
                        type="email"
                        value={user?.email}
                        disabled
                        className='block rounded-sm py-3 px-4 w-full text-lg bg-slate-200 select-none disabled:text-gray-500 text-center'
                    />
                    <hr className='my-3' />
                    <input
                        type="text"
                        autoFocus
                        maxLength="4"
                        placeholder='OTP'
                        value={otp}
                        onChange={handleOtpChange}
                        className='text-center rounded-sm py-3 px-4 w-full block placeholder-gray-500 text-lg bg-slate-200 focus:outline-none font-bold'
                    />
                </div>
                <SheetFooter>
                    <Button
                        onClick={handleResendClick}
                        disabled={!canResend && !initialSend}
                        className={`font-bold rounded-sm text-base text-sky-200 ${canResend || initialSend ? 'bg-sky-900 hover:bg-sky-800' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        {initialSend ? 'Send' : canResend ? 'Re-Send' : `Re-Send in ${countdown}s`}
                    </Button>
                    <Button onClick={handleOtp} className='font-bold bg-sky-900 rounded-sm text-base text-sky-200 hover:bg-sky-800'>
                        Verify
                    </Button>
                    <SheetClose>
                        <Button variant="ghost">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        ) : (
            <SheetContent className='py-24'>
                <div className='bg-green-300 p-2 text-lg font-bold text-green-800 flex justify-center gap-2 items-center rounded-sm'>
                    <CheckCheck size={'27'} />  Email Already Verified
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline" className='my-3'>Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        ),
        modify: (
            <SheetContent className='py-24'>
                <div className='p-2 text-lg font-bold flex flex-col justify-center gap-2 items-center rounded-sm'>
                    <Button onClick={() => setOptions('change')} className="space-x-2 w-full h-11 outline" variant="ghost">
                        <span className='text-lg mb-1'>Change Password</span>
                    </Button>
                    <Button onClick={() => setOptions('reset')} className="space-x-2 w-full h-11 outline" variant="ghost">
                        <span className='text-lg'>Reset Password</span>
                    </Button>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline" className='my-3'>Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        ),
        change: (
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Change Password</SheetTitle>
                    <SheetDescription>Enter your current and new passwords to change your password.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="oldPassword" className="text-right">Old Password</label>
                        <Input name="oldPassword" type="password" value={passwordFields.oldPassword} onChange={handlePasswordChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="newPassword" className="text-right">New Password</label>
                        <Input name="newPassword" type="password" value={passwordFields.newPassword} onChange={handlePasswordChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="confirmPassword" className="text-right">Confirm Password</label>
                        <Input name="confirmPassword" type="password" value={passwordFields.confirmPassword} onChange={handlePasswordChange} className="col-span-3" />
                    </div>
                </div>
                <SheetFooter>
                    <Button onClick={ChangePassword} type="submit">Change Password</Button>
                    <SheetClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        ),
        reset: (
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Password</SheetTitle>
                    <SheetDescription>Set a password for your account.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="newPassword" className="text-right">New Password</label>
                        <Input name="newPassword" type="password" value={passwordFields.newPassword} onChange={handlePasswordChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="confirmPassword" className="text-right">Confirm Password</label>
                        <Input name="confirmPassword" type="password" value={passwordFields.confirmPassword} onChange={handlePasswordChange} className="col-span-3" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={handleResendClick}
                            disabled={!canResend && !initialSend}
                        >
                            {initialSend ? 'Send' : canResend ? 'Re-Send' : `Re-Send in ${countdown}s`}
                        </Button>
                        <Input
                            type="text"
                            autoFocus
                            maxLength="4"
                            placeholder='OTP'
                            value={otp}
                            onChange={handleOtpChange}
                            className='text-center w-full'
                        />
                    </div>
                </div>
                <SheetFooter>
                    <Button onClick={ResetPassword} type="submit">Set Password</Button>
                    <SheetClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        ),
    };




    return (
        <Sheet onOpenChange={(isOpen) => { if (!isOpen) setOptions('default'); }}>
            <SheetTrigger asChild>
                <Avatar className='cursor-pointer select-none'>
                    <AvatarImage src={user?.profilePic} />
                    <AvatarFallback>user</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            {renderContent[option]}
        </Sheet>
    );
}
