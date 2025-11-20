'use client';

import { useFormState } from 'react-dom';
import { FormButtons } from './form-buttons';

export function PostForm({ action }) {
  const [{ errors }, formAction] = useFormState(action, { errors: [] });
  return (
    <>
      <h1>Create a new post</h1>
      {errors.length > 0 && (
        <ul className='form-errors'>
          {errors.map((error, index) => (<li key={index}>{error}</li>))}
        </ul>
      )}
      <ul className='form-errors'></ul>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p className="form-actions">
          <FormButtons />
        </p>
      </form>
    </> 
  );
}