import ProfileForm from '@/components/forms/profile-form'
import React from 'react'
import ProfilePicture from './_components/profile-picture'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache';


const Settings = async () => {
  //Wip profile picture
  const authUser = await currentUser()
  if (!authUser) return null

  const user = await db.user.findUnique({ where: { clerkId: authUser.id } })
  const removeProfileImage = async () => {
    'use server'
    const response = await db.user.update({
      where: { clerkId: authUser.id },
      data: { profileImage: '' },
    });
    revalidatePath('/settings');
    return response;
  }

  const uploadProfileImage = async (image: string) => {
    'use server'
    const response = await db.user.update({
      where: { clerkId: authUser.id },
      data: { profileImage: image },
    });
    revalidatePath('/settings');
    return response;
  }

  return (
    <>
    <div className='flex flex-col gap-4'>

      <h1 className='sticky top-0 z-[10] flex items-center
      justify-between border-b bg-background/50 p-6 text-4xl
      backdrop-blur-lg'>
        <span>Settings</span>
      </h1>
      <div className='flex flex-col gap-10 p-6'>
        <div>
          <h2 className='text-2xl font-bold'>User Profile</h2>
            <p>
              Add or Update your information
            </p>          
        </div>
        <ProfilePicture
          onDelete={removeProfileImage}
          userImage={user?.profileImage || ''}
          onUpload={uploadProfileImage}
        />



        <ProfileForm />
      </div>

    </div>


  </>
  )
}


export default Settings