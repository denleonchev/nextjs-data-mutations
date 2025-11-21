'use server';

import { uploadImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const { storePost, updatePostLikeStatus } = require('@/lib/posts');

export async function createPost(prevState, formData) {
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  const errors = [];
  if (!title && title.trim().length === 0) {
    errors.push('Title is required');
  }
  if (!content && content.trim().length === 0) {
    errors.push('Content is required');
  }
  if (!image.size) {
    errors.push('Image is required');
  }

  if (errors.length) {
    return { errors };
  }

  const imageUrl = await uploadImage(image);

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });

  redirect('/feed');
}

export async function likePost(postId) {
  await updatePostLikeStatus(postId, 2);

  revalidatePath('/feed');
}