'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'

export default function DesignStudio() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-neon-blue">Design</span>{' '}
          <span className="text-neon-purple">Studio</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Design */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Upload Your Design</h2>
            <div 
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors
                ${isDragging ? 'border-neon-blue bg-neon-blue/5' : 'border-gray-300'}
                ${uploadedImage ? 'border-neon-purple' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
              />
              {uploadedImage ? (
                <div className="relative w-full aspect-square max-w-xs mx-auto">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded design"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-2">Drag and drop your design here</p>
                  <p className="text-sm text-gray-500">or</p>
                </>
              )}
              <button 
                onClick={handleBrowseClick}
                className="mt-4 bg-neon-blue text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                {uploadedImage ? 'Upload Different Design' : 'Browse Files'}
              </button>
            </div>
          </div>

          {/* AI Design Generator */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">AI Design Generator</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Describe your design idea..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent"
              />
              <div className="grid grid-cols-2 gap-4">
                <select className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent">
                  <option>Style</option>
                  <option>Minimalist</option>
                  <option>Vintage</option>
                  <option>Abstract</option>
                </select>
                <select className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent">
                  <option>Color Scheme</option>
                  <option>Neon</option>
                  <option>Pastel</option>
                  <option>Monochrome</option>
                </select>
              </div>
              <button className="w-full bg-neon-purple text-white px-6 py-3 rounded-lg hover:opacity-90">
                Generate Design
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[3/4] bg-white rounded-lg shadow-lg">
              {/* T-shirt Template */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/blank-tshirt.png"
                  alt="T-shirt Template"
                  fill
                  className="object-contain"
                />
                {/* Design Overlay */}
                {uploadedImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 relative">
                      <Image
                        src={uploadedImage}
                        alt="Your design"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
              <button className="absolute bottom-4 left-4 right-4 bg-neon-blue text-white py-2 rounded-lg hover:opacity-90">
                Customize Position
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 