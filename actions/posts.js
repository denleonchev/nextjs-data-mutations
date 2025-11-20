'use server';

import { redirect } from 'next/navigation';

const { storePost } = require('@/lib/posts');

export async function createPost(prevState, formData) {
  console.log(formData)
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');
  await storePost({
    imageUrl: '',
    title,
    content,
    userId: 1,
  });

  redirect('/feed');
}