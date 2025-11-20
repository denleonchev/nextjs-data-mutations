'use client';

import { useFormStatus } from 'react-dom';

export function FormButtons() {
  const { pending } = useFormStatus();

  if (pending) {
    return <div>Creating post...</div>
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}