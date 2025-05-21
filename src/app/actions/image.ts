'use server';

import { uploadToCloudinary } from '@/lib/services/product/cloudinary';

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('image') as File;
    if (!file) {
      return { error: 'No file uploaded' };
    }

    if (!file.type.startsWith('image/')) {
      return { error: 'Invalid file type. Only images are allowed.' };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { error: 'File size too large. Maximum size is 5MB.' };
    }

    const result = await uploadToCloudinary({
      buffer: Buffer.from(await file.arrayBuffer()),
      originalname: file.name,
      mimetype: file.type
    });

    return { 
      success: true,
      url: (result as { secure_url: string }).secure_url
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { 
      error: 'Failed to upload file' 
    };
  }
}