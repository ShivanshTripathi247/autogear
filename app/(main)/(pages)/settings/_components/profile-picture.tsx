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
            <Image src={userImage} alt='profile picture' height={100} width={100} />
            <Button onClick={onDelete}>Remove Profile Picture</Button>
          </>
        ) : (
          <UploadCareButton onUpload={onUpload} />
        )}
      </div>
    </div>
  )
}

export default ProfilePicture; 