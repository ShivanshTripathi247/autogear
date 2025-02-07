'use client'

import React, { useState, useEffect } from 'react'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next'
import '@uploadcare/react-uploader/core.css'
import { uploadFile } from '@uploadcare/upload-client'
import Image from 'next/image'
import { env } from 'process'

interface UploadCareButtonProps {
  onUpload: (url: string) => Promise<void>
  initialImage?: string | null
}

const UploadCareButton: React.FC<UploadCareButtonProps> = ({ 
  onUpload,
  initialImage 
}) => {
  const [file, setFile] = useState<any>(null)
  const [currentImage, setCurrentImage] = useState(initialImage || null)

  useEffect(() => {
    setCurrentImage(initialImage)
  }, [initialImage])

  const handleChangeEvent = async (files: any) => {
    const successfulFile = files.allEntries.find((f: any) => f.status === 'success')
    
    if (successfulFile) {
      try {
        const cdnUrl = successfulFile.fileInfo.cdnUrl
        setFile(successfulFile.fileInfo)
        setCurrentImage(cdnUrl)
        await onUpload(cdnUrl)
      } catch (error) {
        console.error('Upload failed:', error)
      }
    }
  }

  return (
    <div className="p-4 rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Profile Picture</h2>
      <div className='flex justify-center items-center'>
        <FileUploaderRegular
          className="uc-dark"
          pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
          onChange={handleChangeEvent}
        />
      </div>

      {currentImage && (
        <div className="mt-6 flex flex-col items-center">
          <h3 className="text-lg font-medium mb-2">Profile Picture Preview</h3>
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              className="object-cover rounded-full"
              src={`${currentImage}/-/preview/-/resize/400x400/`}
              alt="Profile Preview"
              fill
              sizes="(max-width: 400px) 100vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadCareButton