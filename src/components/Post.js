import React, { Component } from 'react';
import Comment from './Comment';
import { Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    const { id, showComments, isViewingPost } = this.props;
    if (showComments) {
      fetch(`http://localhost:3001/posts/${id}/comments`, {
        headers: {'Authorization': 'let-me-in-please'}
      })
      .then(res => res.json())
      .then(comments => this.setState({comments}))
      .catch(err => {
        console.error(err);
        window.alert('Couldnt fetch comments for this post.');
      });

      isViewingPost(true);
    } else isViewingPost(false);
  }

  render() {
    const { id, category, title, body, author, timestamp, voteScore, showComments } = this.props;
    const { comments } = this.state;
    return (
      <article>
        <header>
          <Link to={`/category/${category}/${id}`}>
            <h3>{title}</h3>
          </Link>
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
        {showComments && comments && comments.map(comment => (
          <Comment key={comment.id}
            body={comment.body}
            author={comment.author}
            timestamp={{timeCreated: comment.timestamp}}
            voteScore={comment.voteScore}
          />
        ))}
      </article>
    );
  }
}

export default Post;
