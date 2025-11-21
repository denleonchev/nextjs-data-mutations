'use client';
import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { likePost } from '@/actions/posts';
import { useOptimistic } from 'react';

function Post({ post, like }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <form action={like.bind(null, post.id)} className={post.isLiked ? 'liked' : ''}>
            <LikeButton />
          </form>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, likeOptimistically] = useOptimistic(posts, (prevPosts, likedPostId) => {
    const likedPostIndex = prevPosts.findIndex(post => post.id === likedPostId);
    if (likedPostIndex === -1) {
      return prevPosts;
    }

    const updatedLikedPost = {...prevPosts[likedPostIndex]};
    updatedLikedPost.likes = updatedLikedPost.likes + (updatedLikedPost.isLiked ? -1 : +1); 
    updatedLikedPost.isLiked = !updatedLikedPost.isLiked;

    const updatedPosts = [...prevPosts];
    updatedPosts[likedPostIndex] = updatedLikedPost;

    return updatedPosts;
  })

  async function updatePost(postId) {
    likeOptimistically(postId);
    await likePost(postId);
  }

  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} like={updatePost}/>
        </li>
      ))}
    </ul>
  );
}
