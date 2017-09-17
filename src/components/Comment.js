import React from 'react';

const Comment = ({ body, author, timestamp, voteScore }) => (
  <section>
    <header>
      <h5>Comment by: {author}</h5>
      <h5>Commented at: {timestamp.timeCreated}</h5>
    </header>
    <p>{body}</p>
    <footer>
      <p>This comment has {Math.abs(voteScore)} {voteScore >= 0 ? 'likes' : 'dislikes'}</p>
      <div>
        <button>Upvote</button>
        <button>Downvote</button>
      </div>
    </footer>
  </section>
);

export default Comment;
