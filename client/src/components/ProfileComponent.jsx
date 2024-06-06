import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/Redux/Slices/userSlice';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircleUserRound, MailCheck, KeyRound } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetFooter,

} from "@/components/ui/sheet"

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Avatar>
                    <AvatarImage src={user.profilePic} className='select-none cursor-pointer' />
                    <AvatarFallback>user</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent className='justify-between'>
                <SheetHeader className='px-4 mb-10'>
                    <div className='flex flex-col gap-5 items-center mb-3 '>
                        <Avatar className='w-24 h-24 '>
                            <AvatarImage src={user.profilePic} className='select-none cursor-pointer' />
                            <AvatarFallback>user</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col gap-2 bg-slate-200 py-2 px-5 rounded-sm bg-opacity-70 w-full text'>
                            <span className='overflow-hidden'>
                                {user.name}
                            </span>
                            <span className='overflow-hidden'>
                                {user.email}
                            </span>
                        </div>
                    </div>
                    <hr />
                </SheetHeader>

                <div className='flex flex-col gap-3 text-black dark:text-slate-50 w-full items-start *:pl-6'>

                    <Button onClick={() => dispatch('')}
                        className="space-x-2 w-full outline" variant="ghost">
                        <CircleUserRound />
                        <span className='text-lg mb-1'>Update Profile</span>
                    </Button>

                    <Button onClick={() => dispatch('')}
                        className="space-x-2 w-full outline" variant="ghost">
                        <MailCheck />
                        <span className='text-lg'>Verify Email</span>
                    </Button>

                    <Button onClick={() => dispatch('')}
                        className="space-x-2 w-full outline" variant="ghost">
                        <KeyRound />
                        <span className='text-lg'>Reset Password</span>
                    </Button>
                </div>

                <SheetFooter>
                    <Button onClick={''}
                        className='w-full absolute bottom-4 right-0 text-black dark:text-slate-50 text-base rounded-none'
                        variant="ghost">
                        <span className='border-y-2 w-full py-2'>Send Feedback</span>
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Profile