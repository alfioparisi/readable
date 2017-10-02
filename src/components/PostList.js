import React from 'react';
import Post from './Post';

const PostList = ({ posts, isViewingPost, viewingPost }) => (
  <ul>
    {posts && posts.map(post => (
      <li key={post.id}>
        <Post
          post={post}
          showComments={false}
          isViewingPost={isViewingPost}
          viewingPost={viewingPost}
        />
      </li>
    ))}
  </ul>
);

export default PostList;
