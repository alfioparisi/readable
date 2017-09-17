import React from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => (
  <ul>
    {posts && posts.map(post => (
      <li key={post.id}>
        <Link to={`/category/${post.category}/${post.id}`}>
          <Post
            id={post.id}
            category={post.category}
            title={post.title}
            body={post.body}
            author={post.author}
            timestamp={{timeCreated: post.timestamp}}
            voteScore={post.voteScore}
            showComments={false}
          />
        </Link>
      </li>
    ))}
  </ul>
);

export default PostList;
