export function FormButtons({ isLoading }) {
  if (isLoading) {
    return <div>Creating post...</div>
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}