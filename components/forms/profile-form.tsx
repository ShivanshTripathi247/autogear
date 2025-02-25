'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditUserProfileSchema } from '@/lib/types'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { User } from '@clerk/nextjs/server'
type Props = {
    user: User
    onSubmit: (name: string) => Promise<void>
}


const ProfileForm = ({user, onSubmit}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
        mode: "onChange",

        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
    });
    const handleSubmit = async (values: z.infer<typeof EditUserProfileSchema>) => {
        setIsLoading(true)
        await onSubmit(values?.name)
        setIsLoading(false)
    }
    useEffect(() => {
        form.reset({
            name: user?.name,
            email: user?.email,
        })
    }, [user])



  return (
    <Form {...form}>

        <form className='flex flex-col gap-6'
        onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField 
            disabled={isLoading}
            control={form.control}

            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-lg'>User full name</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder='Enter your full name'
                        
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
        </form>
        <form className='flex flex-col gap-6'>
            <FormField 
            disabled={true}
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-lg'>User email</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder='Enter your email'
                        type='email'
                        disabled={isLoading}                        
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <Button type='submit'
             disabled={isLoading}
             onClick={form.handleSubmit(handleSubmit)}
             className='self-start hover:bg-[#2F006B] hover:text-white'
             >
             {isLoading ? (<>
                <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                Saving
             </>  
             ) : (
                'Save User Settings'
             )}
              </Button>

        </form>
    </Form>
  )
}

export default ProfileForm