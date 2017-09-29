import React, { Component } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import store from '../store';
import { addComment, addCommentOnServer, editCommentOnServer, deleteCommentOnServer, voteCommentOnServer } from '../actions/comments';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      writingComment: false,
      editing: false,
      textarea: ''
    };
    this.handleNewComment = this.handleNewComment.bind(this);
    this.onCommentEdit = this.onCommentEdit.bind(this);
    this.onCommentDelete = this.onCommentDelete.bind(this);
    this.onCommentVote = this.onCommentVote.bind(this);
  }

  componentDidMount() {
    const { id, showComments, isViewingPost } = this.props;
    if (showComments) {
      fetch(`http://localhost:3001/posts/${id}/comments`, {
        headers: {'Authorization': 'let-me-in-please'}
      })
      .then(res => res.json())
      .then(comments => {
        comments.forEach(comment => store.dispatch(addComment(
          comment.id,
          id,
          comment.body,
          comment.author,
          comment.timestamp,
          comment.voteScore
        )));
        const notDeletedComments = comments.filter(comment => !comment.deleted);
        this.setState({comments: notDeletedComments});
      })
      .catch(err => {
        console.error(err);
        window.alert('Couldnt fetch comments for this post.');
      });

      isViewingPost(true);
    } else isViewingPost(false);
  }

  handleNewComment(id, body, timeCreated) {
    const { id: parentId, currentUser } = this.props;
    const author = currentUser ? currentUser.name : 'Anonymous';
    store.dispatch(addCommentOnServer(id, parentId, body, author, timeCreated))
    .then(comment => this.setState(prevState => ({
      comments: [...prevState.comments, comment],
      writingComment: false
    })));
  }

  onCommentEdit(id, body, timeEdited) {
    const { currentUser } = this.props;
    const author = currentUser ? currentUser.name : 'Anonymous';
    store.dispatch(editCommentOnServer(id, body, author, timeEdited))
    .then(comment => this.setState(prevState => ({
      comments: [...prevState.comments.filter(c => c.id !== comment.id), comment]
    })))
    .catch(err => {
      console.error(err);
      window.alert('Couldnt edit the comment.')
    });
  }

  onCommentDelete(id, timeDeleted) {
    const { id: parentId } = this.props;
    store.dispatch(deleteCommentOnServer(id, parentId, timeDeleted))
    .then(() => this.setState(prevState => ({
      comments: prevState.comments.filter(comment => comment.id !== id)
    })))
    .catch(err => {
      console.error(err);
      window.alert('Couldnt delete the comment.')
    });
  }

  onCommentVote(id, upvote) {
    store.dispatch(voteCommentOnServer(id, upvote))
    .then(comment => this.setState(prevState => ({
      comments: [...prevState.comments.filter(c => c.id !== comment.id), comment]
    })))
    .catch(err => {
      console.error(err);
      window.alert('Couldnt vote the comment.');
    });
  }

  render() {
    const { id, category, title, body, author, timestamp, voteScore, showComments, viewingPost } = this.props;
    const { onEdit, onDelete } = this.props;
    const { comments, writingComment, editing, textarea } = this.state;
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
        {editing && (
          <form>
            <textarea value={textarea} onChange={evt => this.setState({textarea: evt.target.value})} />
            <input type="submit" value="Edit" onClick={evt => {
              evt.preventDefault();
              onEdit(id, textarea, Date.now());
              this.setState({textarea: '', editing: false});
            }} />
          </form>
        )}
        <footer>
          <p>This post has {Math.abs(voteScore)} {voteScore >= 0 ? 'likes' : 'dislikes'}</p>
          <div>
            <button>Upvote</button>
            <button>Downvote</button>
          </div>
          {viewingPost && (
            <div>
              <button onClick={() => this.setState({editing: true})}>Edit</button>
              <button onClick={() => onDelete(id, Date.now())}>Delete</button>
            </div>
          )}
          {writingComment && (
            <CommentForm
              onClick={this.handleNewComment}
            />
          )}
          {viewingPost && (
            <div>
              <button
                onClick={() => this.setState({writingComment: true})}
              >Add a comment</button>
            </div>
          )}
        </footer>
        {showComments && comments && comments.sort((a, b) => b.voteScore - a.voteScore)
        .map(comment => (
          <Comment key={comment.id}
            id={comment.id}
            body={comment.body}
            author={comment.author}
            timestamp={{timeCreated: comment.timestamp}}
            voteScore={comment.voteScore}
            onEdit={this.onCommentEdit}
            onDelete={this.onCommentDelete}
            onVote={this.onCommentVote}
          />
        ))}
      </article>
    );
  }
}

export default Post;
