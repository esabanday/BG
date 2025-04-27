'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductData {
  name: string;
  description: string;
  image: File | null;
}

export default function AdminProducts() {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    description: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    if (!productData.image || !productData.name) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', productData.image);
      formData.append('name', productData.name);
      formData.append('description', productData.description);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      
      // Clear the form
      setProductData({
        name: '',
        description: '',
        image: null
      });
      setPreviewUrl('');
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Product Management</h1>
      
      {/* Image Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Product Image</h2>
        
        <div className="space-y-4">
          {/* Image Preview */}
          {previewUrl && (
            <div className="relative w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter product name"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter product description"
            />
          </div>

          {/* Upload Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!productData.image || !productData.name || isUploading}
            className={`px-4 py-2 rounded-md text-white font-medium
              ${!productData.image || !productData.name || isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Product'}
          </button>
        </div>
      </div>

      {/* Product List Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Product List</h2>
        {/* Product list will go here */}
      </div>
    </div>
  );
} 