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
  
    if (currentUser?.profileImage) {
      try {
        // Improved UUID extraction
        const url = new URL(currentUser.profileImage);
        const pathParts = url.pathname.split('/');
        const fileUuid = pathParts[1]; // More reliable extraction from URL structure
  
        if (fileUuid) {
          // Use the correct Uploadcare deletion endpoint
          const response = await fetch(
            `https://api.uploadcare.com/files/${fileUuid}/storage/`,
            {
              method: 'DELETE',
              headers: {
                'Authorization': `Uploadcare.Simple ${process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY}`,
                'Accept': 'application/vnd.uploadcare-v0.7+json'
              }
            }
          );
          
          if (!response.ok) {
            const error = await response.json();
            console.error('Uploadcare deletion failed:', error);
            throw new Error('Failed to delete image from storage');
          }
        }
      } catch (error) {
        console.error('Uploadcare deletion error:', error);
        throw error;
      }
    }
  
    // Update the database
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
  const updateUserInfo = async (name: string) => {
    'use server'
    const updatedUser = await db.user.update({
      where: { clerkId: authUser.id },

      data: {
        name,
      },
    });
    revalidatePath('/settings');
    return updatedUser;
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



        <ProfileForm
          user={user}
          onSubmit={updateUserInfo}
        />
      </div>

    </div>



  </>
  )
}


export default Settings