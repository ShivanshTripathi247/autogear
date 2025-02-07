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
    
    // Get the current profile image URL before updating
    const currentUser = await db.user.findUnique({
      where: { clerkId: authUser.id },
      select: { profileImage: true }
    });
  
    // Update the database to remove the image URL
    const response = await db.user.update({
      where: { clerkId: authUser.id },
      data: { profileImage: '' },
    });
  
    // If there was a previous image, delete it from Uploadcare
    if (currentUser?.profileImage) {
      try {
        const fileUuid = currentUser.profileImage.split('/').pop()?.split('-')[0];
        if (fileUuid) {
          await fetch(`https://api.uploadcare.com/files/${fileUuid}/`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Uploadcare.Simple ${process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY}`,
              'Accept': 'application/vnd.uploadcare-v0.7+json'
            }
          });
        }
      } catch (error) {
        console.error('Failed to delete image from Uploadcare:', error);
      }
    }
  
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