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

    useEffect(() => {
        if (countdown === 0) {
            setCanResend(true);
        } else if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const [userFields, setUserFields] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const handleUserChange = (event) => {
        const name = event.target.name;
        const value = (event.target.value).trim();
        setUserFields(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        setUserFields({
            name: user?.name || '',
            email: user?.email || '',
        })
    }, [user]);

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
                toast.error("Something went wrong!", { position: 'top-center' });
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
            .catch(error => {
                console.log(error);
                if (error.response.status == 400) {
                    toast.error("Invalid OTP!", { position: 'top-center' });
                } else {
                    toast.error("Something went wrong!", { position: 'top-center' });
                }
            });
    };

    return (
        <Sheet onOpenChange={(isOpen) => { if (!isOpen) setOptions('default'); }}>
            <SheetTrigger asChild>
                <Avatar>
                    <AvatarImage src={user.profilePic} className='select-none cursor-pointer' />
                    <AvatarFallback>user</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            {getOptions(option, setOptions, user, userFields, handleUserChange, handleSaveChanges, otp, handleOtpChange, handleOtp, handleResendClick, canResend, countdown, initialSend)}
        </Sheet>
    );
}



const getOptions = (option, setOptions, user, userFields, handleUserChange, handleSaveChanges, otp, handleOtpChange, handleOtp, handleResendClick, canResend, countdown, initialSend) => {
    switch (option) {
        case 'default':
            return (
                <SheetContent>
                    <SheetHeader className='px-4 mb-10'>
                        <div className='flex flex-col gap-5 items-center mb-3'>
                            <Avatar className='w-24 h-24'>
                                <AvatarImage src={user.profilePic} className='select-none cursor-pointer' />
                                <AvatarFallback>user</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col gap-2 bg-slate-200 py-2 px-5 rounded-sm bg-opacity-70 w-full text'>
                                <span className='overflow-hidden'>{user.name}</span>
                                <span className='overflow-hidden'>{user.email}</span>
                            </div>
                        </div>
                        <hr />
                    </SheetHeader>
                    <div className='flex flex-col gap-3 text-black dark:text-slate-50 w-full items-start'>
                        <Button onClick={() => {
                            setOptions('update');
                        }} className="space-x-2 w-full outline" variant="ghost">
                            <CircleUserRound />
                            <span className='text-lg mb-1'>Update Profile</span>
                        </Button>
                        <Button onClick={() => setOptions('verify')} className="space-x-2 w-full outline" variant="ghost">
                            <MailCheck />
                            <span className='text-lg'>Verify Email</span>
                        </Button>
                        <Button onClick={() => setOptions('reset')} className="space-x-2 w-full outline" variant="ghost">
                            <KeyRound />
                            <span className='text-lg'>Reset Password</span>
                        </Button>
                    </div>
                    <SheetFooter>
                        <Button onClick={() => { }} className='w-full absolute bottom-4 right-0 text-black dark:text-slate-50 text-base rounded-none' variant="ghost">
                            <span className='border-y-2 w-full py-2'>Send Feedback</span>
                        </Button>
                    </SheetFooter>
                </SheetContent>
            );
        case 'update':
            return (
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
            );
        case 'verify':
            return !user.verified ? (
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
                            value={user.email}
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
            );
        case 'reset':
            return (
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Reset Password</SheetTitle>
                        <SheetDescription>Follow the instructions sent to your email to reset your password.</SheetDescription>
                    </SheetHeader>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button variant="ghost">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            );
        default:
            return null;
    }
};
