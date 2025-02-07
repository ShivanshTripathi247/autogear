import React from 'react';
import Image from 'next/image';
import UploadCareButton from './uploadcare-button';
import { Button } from '@/components/ui/button';


type Props = {
    userImage: string | null
    onDelete?: any
    onUpload: any
  }
  
  const ProfilePicture = ({ userImage, onDelete, onUpload }: Props) => {
  return (
    <div className='flex flex-col'>
      <p className='text-lg text-white'>Profile Picture</p>
      <div className='flex h-[30vh] flex-col items-center justify-center'>
        {userImage ? (
          <>
          <div className='flex flex-col gap-4 justify-center items-center'>
          <div className='relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300'>
            <Image src={userImage} alt='profile picture'  className='object-cover rounded-full' fill />
          </div>

            <Button onClick={onDelete}
            className='self-start hover:bg-[#2F006B] hover:text-white'>Remove Profile Picture</Button>
          </div>
          </>
        ) : (
          <UploadCareButton onUpload={onUpload} />
        )}
      </div>
    </div>
  )
}

export default ProfilePicture; 