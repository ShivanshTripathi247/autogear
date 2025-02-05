'use client'

import React, { useState } from 'react'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css'


function UploadCareButton() {
  const [file, setFile] = useState(null) // Single file state

  const handleChangeEvent = (files) => {
    console.log('Uploaded file:', files)
    const successfulFile = files.allEntries.find((f) => f.status === 'success')
    setFile(successfulFile || null) // Set the file or clear state
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
      <FileUploaderRegular
        sourceList={['local', 'camera']}
        className="uc-dark"
        pubkey="cd8a3dedcd5f41444b83"
        onChange={handleChangeEvent}
      />

      {file && (
        <div className="mt-6 flex flex-col items-center">
          <h3 className="text-lg font-medium mb-2">Profile Picture Preview</h3>
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              className="w-full h-full object-cover"
              src={`${file.cdnUrl}/-/preview/-/resize/400x400/`}
              alt={file.fileInfo.originalFilename || 'Profile Picture'}
              title={file.fileInfo.originalFilename || 'Profile Picture'}
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
