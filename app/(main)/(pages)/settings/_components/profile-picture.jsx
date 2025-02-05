import React from 'react'
import UploadCareButton from './uploadcare-button'
import { X } from 'lucide-react'
import Image from 'next/image'

const ProfilePicture = () => {
  return (
    <div className='flex flex-col'>
        <p className='text-lg text-white'>Profile Picture</p>

        <div className='flex h-[30vh] flex-col items-center justify-center'>
            { false ? 
            <><div className='relative h-full w-2/12'>
                <Image 
                    src={userImage} 
                    alt='profile picture' 
                    fill                />
            </div>
            <Button onClick={onRemoveProfilePicture}
            className='bg-transparent text-white/70
            hover:bg-transparent hover:text-white'>
                <X/>Remove Profile Picture

            </Button>
            </> : <UploadCareButton />}

        </div>
    </div>

  )
}

export default ProfilePicture