'use client';

import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState, useTransition } from 'react';

import { Label } from '@/app/components/ui/Label';
import { uploadImage } from '@/app/actions/image';

interface ImageUploadProps {
  value: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, handleChange, disabled }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    setImagePreview(value);
    setIsUploaded(!!value);
  }, [value]);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
      setIsUploaded(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await uploadImage(formData);

        if (response.error) {
          alert(response.error);
          handleRemove();
          return;
        }

        if (response.url) {
          handleChange(response.url);
          setIsUploaded(true);
        }
      });
    } catch (error) {
      alert('Failed to upload image');
      console.error(error);
      handleRemove();
    }
  };

  const handleRemove = () => {
    setImagePreview('');
    setSelectedFile(null);
    setIsUploaded(false);
    handleChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label>
          Featured Image <span className="text-red-500">*</span>
        </Label>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        className="hidden"
        disabled={disabled || isPending}
      />

      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        {imagePreview ? (
          <div className="space-y-2 text-center">
            <div className="relative w-full h-48 mx-auto">
              <Image
                src={imagePreview}
                alt="Preview"
                className="h-full mx-auto object-cover rounded-md"
                width={200}
                height={200}
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-gray-800/70 text-white p-1 rounded-full hover:bg-gray-900/70"
                disabled={disabled || isPending}
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm text-blue-600 hover:underline z-50"
                disabled={disabled || isPending}
              >
                Change image
              </button>
              {selectedFile && !isUploaded && (
                <button
                  type="button"
                  onClick={handleUpload}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={disabled || isPending}
                >
                  {isPending ? 'Uploading...' : 'Upload image'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            className="space-y-1 text-center justify-center items-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 text-center w-full justify-center">
              <div className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500">
                Select a file
              </div>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </div>
        )}
      </div>
    </div>
  );
}
