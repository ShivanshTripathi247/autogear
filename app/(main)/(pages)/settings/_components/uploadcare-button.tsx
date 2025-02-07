'use client'

import React, { useState } from 'react'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css'
import { uploadFile } from '@uploadcare/upload-client'
import Image from 'next/image'

interface UploadCareButtonProps {
  onUpload: (url: string) => Promise<void>;
}

function UploadCareButton({ onUpload }: UploadCareButtonProps) {
  const [file, setFile] = useState(null)

  const handleChangeEvent = async (files) => {
    console.log('Uploaded file:', files)
    const successfulFile = files.allEntries.find((f) => f.status === 'success')
    
    // Only attempt upload if we have a successful file
    if (successfulFile) {
      try {
        const result = await uploadFile(successfulFile.file, {
          publicKey: 'cd8a3dedcd5f41444b83',
          store: 'auto',
          metadata: {
            subsystem: 'js-client'
          }
        })
        setFile(result)
        onUpload(result.cdnUrl)
      } catch (error) {
        console.error('Upload failed:', error)
      }
    }
  }

  const formatSize = (bytes) => {
    if (!bytes) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
  }

  return (
    <div className="p-4 rounded-lg max-w-md mx-auto">
      
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Profile Picture</h2>
      <div className='flex justify-center items-center'>
      <FileUploaderRegular

        className="uc-dark"
        pubkey="cd8a3dedcd5f41444b83"
        onChange={handleChangeEvent}

      /></div>


      {file && (
        <div className="mt-6 flex flex-col items-center">
        <h3 className="text-lg font-medium mb-2">Profile Picture Preview</h3>
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            className="object-cover"
            src={`${file.cdnUrl}/-/preview/-/resize/400x400/`}
            alt={file.fileInfo.originalFilename || 'Profile Picture'}
            title={file.fileInfo.originalFilename || 'Profile Picture'}
            fill
          />
        </div>
          <p className="mt-2 text-sm font-medium">{file.fileInfo.originalFilename}</p>
          <p className="text-sm text-gray-500">{formatSize(file.fileInfo.size)}</p>
        </div>
      )}
    </div>
  )
}

export default UploadCareButton
