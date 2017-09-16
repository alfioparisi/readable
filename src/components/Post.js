import React from 'react';
import Comment from './Comment';

const Post = ({ category, title, body, author, timestamp, voteScore }) => (
  <article>
    <header>
      <h3>{title}</h3>
      <h5>Category: {category}</h5>
      <h5>Posted by: {author}</h5>
      <h5>Time posted: {timestamp.timeCreated}</h5>
    </header>
    <p>{body}</p>
    <footer>
      <p>This post has {Math.abs(voteScore)} {voteScore >= 0 ? 'likes' : 'dislikes'}</p>
      <div>
        <button>Upvote</button>
        <button>Downvote</button>
      </div>
    </footer>
    <Comment
      title={'You wont belive it.'}
      body={'The first comment ever!'}
      author={'Anonymous'}
      timestamp={{timeCreated: '05/05/05'}}
      voteScore={0}
    />
  </article>
);

export default Post;
