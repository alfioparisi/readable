import React, { Component } from 'react';
import EditingForm from './EditingForm';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      date: ''
    };
  }

  componentDidMount() {
    const { timestamp } = this.props;
    const date = new Date(timestamp.timeCreated).toLocaleString();
    this.setState({date});
  }

  render() {
    const { id, body, author, voteScore, onEdit, onDelete, onVote } = this.props;
    const { editing, date } = this.state;
    return (
      <section>
        <header>
          <h5>Comment by: {author}</h5>
          <h5>Commented at: {date}</h5>
        </header>
        <p>{body}</p>
        {editing && <EditingForm body={body} onEdit={(textarea, timeEdited) => {
          onEdit(id, textarea, timeEdited);
          this.setState({editing: false});
        }} />}
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

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default Comment;
