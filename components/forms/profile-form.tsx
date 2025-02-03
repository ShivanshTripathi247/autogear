'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditUserProfile } from '@/lib/types'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
type Props = {}

const ProfileForm = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof EditUserProfile>>({
        mode: "onChange",
        resolver: zodResolver(EditUserProfile),
        defaultValues: {
            name: "",
            email: "",
        },
    });
  return (
    <Form {...form}>
        <form className='flex flex-col gap-6'>
            <FormField 
            disabled={isLoading}
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-lg'>User full name</FormLabel>
                    <FormControl>
                        <Input
                        placeholder='Enter your full name'
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
        </form>
        <form className='flex flex-col gap-6'>
            <FormField 
            disabled={isLoading}
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-lg'>User email</FormLabel>
                    <FormControl>
                        <Input
                        placeholder='Enter your email'
                        type='email'
                        disabled={isLoading}
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
        </form>
    </Form>
  )
}

export default ProfileForm