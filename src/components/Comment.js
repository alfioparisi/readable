import React, { Component } from 'react';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      textarea: ''
    };
  }

  render() {
    const { id, body, author, timestamp, voteScore, onEdit, onDelete, onVote } = this.props;
    const { editing, textarea } = this.state;
    return (
      <section>
        <header>
          <h5>Comment by: {author}</h5>
          <h5>Commented at: {timestamp.timeCreated}</h5>
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
          <p>This comment has {Math.abs(voteScore)} {voteScore >= 0 ? 'likes' : 'dislikes'}</p>
          <div>
            <button onClick={() => onVote(id, true)}>Upvote</button>
            <button onClick={() => onVote(id, false)}>Downvote</button>
            <button onClick={() => this.setState({editing: true})}>Edit</button>
            <button onClick={() => onDelete(id, Date.now())}>Delete</button>
          </div>
        </footer>
      </section>
    );
  }
}

export default Comment;
