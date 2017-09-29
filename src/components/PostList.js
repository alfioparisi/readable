import React from 'react';
import Post from './Post';

const PostList = ({ posts, isViewingPost, viewingPost, currentUser, onVote }) => (
  <ul>
    {posts && posts.map(post => (
      <li key={post.id}>
        <Post
          id={post.id}
          category={post.category}
          title={post.title}
          body={post.body}
          author={post.author}
          timestamp={{timeCreated: post.timestamp}}
          voteScore={post.voteScore}
          showComments={false}
          isViewingPost={isViewingPost}
          viewingPost={viewingPost}
          currentUser={currentUser}
          onVote={onVote}
        />
      </li>
    ))}
  </ul>
);

export default PostList;
