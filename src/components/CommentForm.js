import React, { Component } from 'react';
import uuidv1 from 'uuid';
import { connect } from 'react-redux';
import { addCommentOnServer } from '../actions/comments';

/**
  @param {string} : the id of the parent post
  @param {string} : the logged in user, if any
  @param {function} : add a comment on server and on Redux
*/
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textarea: ''
    };
  }

  render() {
    const { parentId, currentUser, onClick } = this.props;
    const { textarea } = this.state;
    return (
      <form>
        <textarea
          placeholder="Write your comment here."
          value={textarea}
          onChange={evt => this.setState({
            textarea: evt.target.value
          })}
        />
        <input type="submit" value="Comment"
          onClick={evt => {
            evt.preventDefault();
            const author = currentUser || 'Anonymous';
            onClick(
              uuidv1(),
              parentId,
              textarea,
              author,
              Date.now()
            );
            this.setState({textarea: ''});
          }}
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (id, parentId, body, author, timeCreated) => {
    dispatch(addCommentOnServer(id, parentId, body, author, timeCreated));
    ownProps.onClick();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
